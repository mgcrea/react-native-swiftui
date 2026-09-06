import SwiftUI

// MARK: - View

struct NumberFieldView: View {
  @ObservedObject var props: NumberFieldProps
  @FocusState private var isFocused: Bool
  /// Bound by the field instead of `props`, so a props-driven update can be told
  /// apart from typing. See `inputField()`.
  @State private var localValue: Double?

  init(props: NumberFieldProps) {
    self.props = props
    _localValue = State(initialValue: props.value)
  }

  var body: some View {
    LabeledContentView(label: props.label, labelStyle: props.labelStyle) {
      inputField()
    }
  }

  @ViewBuilder
  private func inputField() -> some View {
    TextField(props.placeholder, value: $localValue, formatter: props.formatter)
      .focused($isFocused)
      .keyboardType(props.keyboardType)
      .applyStyles(props.style)
      .disabledStyle(props.disabled)
      .onChange(of: isFocused) { newValue in
        newValue ? props.onFocus?() : props.onBlur?()
      }
      .onChange(of: localValue) { newValue in
        // The props observer below assigns local first, so a JS-driven update is
        // already equal here and emits nothing.
        guard newValue != props.value else { return }
        props.value = newValue
        props.onChange?(newValue)
      }
      .onChange(of: props.value) { newValue in
        // Sync only — never emits.
        localValue = newValue
      }
      .keyboardDoneToolbar(isFocused: $isFocused)
  }
}
