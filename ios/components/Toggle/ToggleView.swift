import SwiftUI

public struct ToggleView: View {
  @ObservedObject public var props: ToggleProps

  public init(props: ToggleProps) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty {
      toggleContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent {
          toggleContent()
        } label: {
          Text(props.label)
            .applyStyles(props.labelStyle)
        }
      } else {
        HStack {
          Text(props.label)
            .applyStyles(props.labelStyle)
          Spacer()
          toggleContent()
        }
      }
    }
  }

  @ViewBuilder
  private func toggleContent() -> some View {
    Toggle("", isOn: $props.isOn)
      .labelsHidden()
      .disabled(props.disabled)
      .onChange(of: props.isOn) { newValue in
        props.onChange?(newValue)
      }
  }
}
