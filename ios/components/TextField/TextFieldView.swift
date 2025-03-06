import SwiftUI

// MARK: - View

public struct TextFieldView: View {
  @ObservedObject public var props: TextFieldProps
  @FocusState private var isFocused: Bool

  public init(props: TextFieldProps) {
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
    Group {
      if props.multiline {
        TextEditor(text: $props.text)
      } else if props.secure {
        SecureField(props.placeholder, text: $props.text)
      } else {
        TextField(props.placeholder, text: $props.text)
      }
    }
    .keyboardType(props.keyboardType)
    .disabled(props.disabled).foregroundColor(props.disabled ? .gray : .primary)
    .focused($isFocused)
//    .toolbar {
//      ToolbarItemGroup(placement: .keyboard) {
//        Spacer()
//        Button("Done") {
//          isFocused = false
//        }
//      }
//    }
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
    .onChange(of: props.text) { newValue in
      props.onChange?(newValue)
    }
  }
}
