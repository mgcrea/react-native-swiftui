import SwiftUI

public struct ToggleView: View {
  @ObservedObject public var props: ToggleProps
  /// The control binds to this rather than to `props` directly, so a
  /// props-driven update can be distinguished from a user interaction. See
  /// `toggleContent()`.
  @State private var localIsOn: Bool

  public init(props: ToggleProps) {
    self.props = props
    _localIsOn = State(initialValue: props.isOn)
  }

  public var body: some View {
    LabeledContentView(label: props.label, labelStyle: props.labelStyle) {
      toggleContent()
    }
  }

  @ViewBuilder
  private func toggleContent() -> some View {
    Toggle("", isOn: $localIsOn)
      .labelsHidden()
      .disabled(props.disabled)
      .onChange(of: localIsOn) { newValue in
        // Only a user interaction can leave local and props out of step: the
        // props observer below assigns local *before* this fires, so a
        // JS-driven update arrives here already equal and emits nothing.
        guard newValue != props.isOn else { return }
        props.isOn = newValue
        props.onChange?(newValue)
      }
      .onChange(of: props.isOn) { newValue in
        // Sync only — deliberately never calls onChange, which is what made a
        // JS-originated update echo straight back to JS as a user event.
        localIsOn = newValue
      }
  }
}
