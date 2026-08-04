import SwiftUI

// MARK: - View

struct TextFieldView: View {
  @ObservedObject var props: TextFieldProps
  @FocusState private var isFocused: Bool
  /// Bound by the field instead of `props`, so a props-driven update can be told
  /// apart from typing. See `inputField()`.
  @State private var localText: String

  init(props: TextFieldProps) {
    self.props = props
    _localText = State(initialValue: props.text)
  }

  var body: some View {
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
        TextEditor(text: $localText)
      } else if props.secure {
        SecureField(props.placeholder, text: $localText)
      } else {
        TextField(props.placeholder, text: $localText)
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
    .onChange(of: localText) { newValue in
      // maxLength is enforced here, on the local binding, rather than by writing
      // props.text from inside an observer of props.text — which re-entered the
      // same observer and then emitted onChange unconditionally.
      let truncated = props.maxLength.map { String(newValue.prefix($0)) } ?? newValue
      if truncated != newValue {
        localText = truncated
      }
      // The props observer below assigns local first, so a JS-driven update is
      // already equal here and emits nothing. Only typing gets through.
      guard truncated != props.text else { return }
      props.text = truncated
      props.onChange?(truncated)
    }
    .onChange(of: props.text) { newValue in
      // Sync only — never emits.
      localText = newValue
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
