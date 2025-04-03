import SwiftUI

// MARK: - View

public struct NumberFieldView: View {
  @ObservedObject public var props: NumberFieldProps
  @FocusState private var isFocused: Bool

  public init(props: NumberFieldProps) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty {
      inputField()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent(props.label) {
          inputField()
        }
      } else {
        HStack {
          Text(props.label)
          inputField()
        }
      }
    }
  }

  @ViewBuilder
  private func inputField() -> some View {
    TextField(props.placeholder, value: $props.value, formatter: props.formatter)
      .focused($isFocused)
      .keyboardType(props.keyboardType)
      .applyStyles(props.style)
      .disabled(props.disabled).foregroundStyle(props.disabled ? .gray : .primary)
      .onChange(of: isFocused) { newValue in
        newValue ? props.onFocus?() : props.onBlur?()
      }
      .onChange(of: props.value) { newValue in
        props.onChange?(newValue)
      }.toolbar {
        ToolbarItemGroup(placement: .keyboard) {
          if isFocused {
            Spacer()
            Button("Done") {
              isFocused = false
            }
          }
        }
      }
  }
}
