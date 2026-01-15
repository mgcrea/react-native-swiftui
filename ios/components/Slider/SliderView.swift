import SwiftUI

public struct SliderView<Content: View>: View {
  @ObservedObject public var props: SliderProps
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
        LabeledContent {
          sliderContent()
        } label: {
          Text(props.label)
            .applyStyles(props.labelStyle)
        }
      } else {
        HStack {
          Text(props.label)
            .applyStyles(props.labelStyle)
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
          // Call focus/blur directly instead of relying on .onChange(of: isFocused)
          // because SwiftUI coalesces rapid state changes and may skip intermediate values
          if editing {
            props.onFocus?()
          } else {
            // Sync final value to props when user stops dragging
            props.value = localValue
            props.onBlur?()
          }
        }
      )
      .disabled(props.disabled)
      .foregroundColor(props.disabled ? .gray : .primary)
      .onChange(of: localValue) { newValue in
        // Fire onChange during active editing OR when value differs from props
        // (handles initial tap where isEditing may not be set yet)
        guard isEditing || newValue != props.value else { return }
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
