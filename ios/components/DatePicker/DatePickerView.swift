import SwiftUI

// MARK: - View

public struct DatePickerView: View {
  @ObservedObject public var props: DatePickerProps
  @FocusState private var isFocused: Bool

  public init(props: DatePickerProps) {
    self.props = props
  }

  public var body: some View {
    props.datePickerStyle.applyStyle(DatePicker(
      selection: $props.selection,
      displayedComponents: props.displayedComponents, label: {
        Text(props.label).foregroundColor(props.disabled ? .gray : .primary)
      }
    )
    .disabled(props.disabled)
    .focused($isFocused)
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
    .onChange(of: props.selection) { newValue in
      props.onChange?(newValue)
    })
  }
}
