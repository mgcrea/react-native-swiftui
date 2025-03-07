import SwiftUI

public struct SliderView: View {
  @ObservedObject public var props: SliderProps

  public init(props: SliderProps) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty {
      sliderContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent(props.label) {
          sliderContent()
        }
      } else {
        HStack {
          Text(props.label)
          sliderContent()
        }
      }
    }
  }

  @ViewBuilder
  private func sliderContent() -> some View {
    Slider(
      value: $props.value,
      in: props.minimum ... props.maximum,
      step: props.step
    )
    .disabled(props.disabled)
    .foregroundColor(props.disabled ? .gray : .primary)
    .onChange(of: props.value) { newValue in
      props.onChange?(newValue)
    }
  }
}
