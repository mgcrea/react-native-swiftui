import SwiftUI

// MARK: - View

public struct DatePickerView: View {
  @ObservedObject public var props: DatePickerProps
  @FocusState private var isFocused: Bool

  public init(props: DatePickerProps) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty {
      datePickerContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent {
          datePickerContent()
        } label: {
          Text(props.label)
            .applyStyles(props.labelStyle)
        }
      } else {
        HStack {
          Text(props.label)
            .applyStyles(props.labelStyle)
          datePickerContent()
        }
      }
    }
  }

  @ViewBuilder
  private func datePickerContent() -> some View {
    props.datePickerStyle.applyStyle(
      DatePicker(
        selection: $props.selection,
        displayedComponents: props.displayedComponents,
        label: { EmptyView() }
      )
      .labelsHidden()
    )
    .disabled(props.disabled)
    .focused($isFocused)
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
    .onChange(of: props.selection) { newValue in
      props.onChange?(newValue)
    }
  }
}
