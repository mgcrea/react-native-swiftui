import SwiftUI

// MARK: - View

public struct StepperView: View {
  @ObservedObject public var props: StepperProps
  @FocusState private var isFocused: Bool

  public init(props: StepperProps) {
    self.props = props
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
      Text("\(props.value)")
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
