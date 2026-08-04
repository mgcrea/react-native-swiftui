import SwiftUI

// MARK: - View

public struct DatePickerView: View {
  @ObservedObject public var props: DatePickerProps
  @FocusState private var isFocused: Bool
  /// Bound by the control instead of `props`, so a props-driven update can be
  /// told apart from a user interaction. See `datePickerContent()`.
  @State private var localSelection: Date

  public init(props: DatePickerProps) {
    self.props = props
    _localSelection = State(initialValue: props.selection)
  }

  public var body: some View {
    LabeledContentView(label: props.label, labelStyle: props.labelStyle) {
      datePickerContent()
    }
  }

  @ViewBuilder
  private func datePickerContent() -> some View {
    props.datePickerStyle.applyStyle(
      DatePicker(
        selection: $localSelection,
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
    .onChange(of: localSelection) { newValue in
      // The props observer below assigns local first, so a JS-driven update is
      // already equal here and emits nothing.
      guard newValue != props.selection else { return }
      props.selection = newValue
      props.onChange?(newValue)
    }
    .onChange(of: props.selection) { newValue in
      // Sync only — never emits.
      localSelection = newValue
    }
  }
}
