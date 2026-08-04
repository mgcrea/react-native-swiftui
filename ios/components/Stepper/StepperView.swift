import SwiftUI

// MARK: - View

public struct StepperView<Content: View>: View {
  @ObservedObject public var props: StepperProps
  @FocusState private var isFocused: Bool
  /// Bound by the control instead of `props`, so a props-driven update can be
  /// told apart from a user interaction. See `stepperContent()`.
  @State private var localValue: Int
  let content: () -> Content

  public init(props: StepperProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
    _localValue = State(initialValue: props.value)
  }

  public var body: some View {
    if props.label.isEmpty {
      stepperContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent {
          stepperContent()
        } label: {
          Text(props.label)
            .applyStyles(props.labelStyle)
        }
      } else {
        HStack {
          Text(props.label)
            .applyStyles(props.labelStyle)
          stepperContent()
        }
      }
    }
  }

  @ViewBuilder
  private func stepperContent() -> some View {
    Stepper(
      value: $localValue,
      in: props.range,
      step: props.step
    ) {
      content()
    }
    .applyStyles(props.style)
    .focused($isFocused)
    .onChange(of: localValue) { newValue in
      // The props observer below assigns local first, so a JS-driven update is
      // already equal here and emits nothing. Only a real tap gets through.
      guard newValue != props.value else { return }
      props.value = newValue
      props.onChange?(String(newValue))
    }
    .onChange(of: props.value) { newValue in
      // Sync only — never emits.
      localValue = newValue
    }
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
  }
}
