import SwiftUI

public struct SliderView<Content: View>: View {
  @ObservedObject public var props: SliderProps
  @State private var isFocused: Bool = false
  let content: () -> Content

  public init(props: SliderProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
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
      content()
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
