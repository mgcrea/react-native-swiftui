import SwiftUI

// MARK: - View

public struct StepperView<Content: View>: View {
  @ObservedObject public var props: StepperProps
  @FocusState private var isFocused: Bool
  let content: () -> Content

  public init(props: StepperProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    if props.label.isEmpty {
      stepperContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent(props.label) {
          stepperContent()
        }
      } else {
        HStack {
          Text(props.label)
          stepperContent()
        }
      }
    }
  }

  @ViewBuilder
  private func stepperContent() -> some View {
    Stepper(
      value: $props.value,
      in: props.minimum ... props.maximum,
      step: props.step
    ) {
      content()
    }
    .applyStyles(props.style)
    .focused($isFocused)
    .onChange(of: props.value) { newValue in
      props.onChange?(String(newValue))
    }
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
  }
}
