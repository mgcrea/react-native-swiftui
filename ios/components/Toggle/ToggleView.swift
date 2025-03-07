import SwiftUI

public struct ToggleView: View {
  @ObservedObject public var props: ToggleProps

  public init(props: ToggleProps) {
    self.props = props
  }

  public var body: some View {
    Toggle(props.label, isOn: $props.isOn)
      .disabled(props.disabled)
      .foregroundColor(props.disabled ? .gray : .primary)
      .onChange(of: props.isOn) { newValue in
        props.onChange?(newValue)
      }
  }
}
