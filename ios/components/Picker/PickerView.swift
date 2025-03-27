import SwiftUI

// MARK: - View

public struct PickerView: View {
  @ObservedObject var props: PickerProps

  public init(props: PickerProps, onSelectionChanged _: ((String) -> Void)? = nil) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty || props.pickerStyle != .segmented {
      pickerContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent(props.label) {
          pickerContent()
        }
      } else {
        HStack {
          Text(props.label)
          pickerContent()
        }
      }
    }
  }

  @ViewBuilder
  private func pickerContent() -> some View {
    props.pickerStyle.applyStyle(
      Picker(props.label, selection: $props.selection) {
        ForEach(props.options) { option in
          Text(option.label).tag(option.value)
        }
      }.onChange(of: props.selection) { newValue in
        props.onChange?(newValue)
      }
    )
    .applyStyles(props.style)
  }
}
