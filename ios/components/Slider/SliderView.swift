import SwiftUI

public struct SliderView<Content: View>: View {
  @ObservedObject public var props: SliderProps
  @State private var isFocused: Bool = false
  @State private var localValue: Double = 0
  @State private var isEditing: Bool = false
  let content: () -> Content

  public init(props: SliderProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
    _localValue = State(initialValue: props.value)
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
        value: $localValue,
        in: props.minimum ... props.maximum,
        step: props.step,
        onEditingChanged: { editing in
          isEditing = editing
          isFocused = editing
          if !editing {
            // Sync final value to props when user stops dragging
            props.value = localValue
          }
        }
      )
      .disabled(props.disabled)
      .foregroundColor(props.disabled ? .gray : .primary)
      .onChange(of: isFocused) { newValue in
        newValue ? props.onFocus?() : props.onBlur?()
      }
      .onChange(of: localValue) { newValue in
        // Only fire onChange during active editing
        guard isEditing else { return }
        props.onChange?(newValue)
      }
      .onChange(of: props.value) { newValue in
        // Sync from props only when not editing (external update)
        guard !isEditing else { return }
        localValue = newValue
      }
    }
  }
}
