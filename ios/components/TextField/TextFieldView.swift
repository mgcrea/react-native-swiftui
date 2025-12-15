import SwiftUI

// MARK: - View

public struct TextFieldView: View {
  @ObservedObject public var props: TextFieldProps
  @FocusState private var isFocused: Bool

  public init(props: TextFieldProps) {
    self.props = props
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: 4) {
      if props.label.isEmpty {
        inputField()
      } else {
        if #available(iOS 16.0, *) {
          LabeledContent {
            inputField()
          } label: {
            Text(props.label)
              .applyStyles(props.labelStyle)
          }
        } else {
          HStack {
            Text(props.label)
              .applyStyles(props.labelStyle)
            inputField()
          }
        }
      }

      if !props.helperText.isEmpty {
        Text(props.helperText)
          .font(.caption)
          .foregroundColor(props.error ? .red : .secondary)
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
    .textContentType(props.textContentType)
    .autocapitalization(props.autocapitalizationType ?? .sentences)
    .focused($isFocused)
    .applyIf(props.submitLabel != nil) {
      $0.submitLabel(props.submitLabel!)
    }
    .applyStyles(props.style)
    .disabled(props.disabled).foregroundStyle(props.disabled ? .gray : .primary)
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
    .onChange(of: props.text) { newValue in
      // Enforce maxLength on text changes
      if let maxLength = props.maxLength, newValue.count > maxLength {
        props.text = String(newValue.prefix(maxLength))
      }
      props.onChange?(props.text)
    }
    .toolbar {
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
