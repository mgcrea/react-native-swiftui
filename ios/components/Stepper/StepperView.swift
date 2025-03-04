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
    Stepper(
      value: $props.value,
      in: props.minimum ... props.maximum,
      step: props.step
    ) {
      Text("\(props.value)") // Show value here
        .foregroundColor(.gray) // Optional styling
    }
    .focused($isFocused)
    .onChange(of: props.value) { newValue in
      print("Stepper value changed: \(newValue)")
      props.onChange?(String(newValue))
    }
    .onChange(of: isFocused) { newValue in
      newValue ? props.onFocus?() : props.onBlur?()
    }
  }
}
