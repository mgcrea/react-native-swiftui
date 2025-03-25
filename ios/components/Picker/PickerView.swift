import SwiftUI

// MARK: - View

public struct PickerView: View {
  @ObservedObject var props: PickerProps

  public init(props: PickerProps, onSelectionChanged _: ((String) -> Void)? = nil) {
    self.props = props
  }

  public var body: some View {
    props.pickerStyle.applyStyle(
      Picker(props.label, selection: $props.selection) {
        ForEach(props.options, id: \.self) { option in
          Text(option).tag(option)
        }
      }.onChange(of: props.selection) { newValue in
        props.onChange?(newValue)
      }
    )
    .applyStyles(props.style)
  }
}
