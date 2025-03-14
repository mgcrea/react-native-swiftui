import SwiftUI

public struct SliderView: View {
  @ObservedObject public var props: SliderProps
  @State private var isFocused: Bool = false

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
    HStack {
      Text(String(format: props.step >= 1 ? "%.0f" : "%.1f", props.value))
        .foregroundColor(.gray)
      Slider(
        value: $props.value,
        in: props.minimum ... props.maximum,
        step: props.step,
        onEditingChanged: { self.isFocused = $0 }
      )
      .disabled(props.disabled)
      .foregroundColor(props.disabled ? .gray : .primary)
      .onChange(of: isFocused) { newValue in
        newValue ? props.onFocus?() : props.onBlur?()
      }
      .onChange(of: props.value) { newValue in
        props.onChange?(newValue)
      }
    }
  }
}
