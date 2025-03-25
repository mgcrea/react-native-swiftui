import SwiftUI

public struct ButtonView<Content: View>: View {
  @ObservedObject public var props: ButtonProps
  let content: () -> Content

  public init(props: ButtonProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    if props.title != nil {
      return AnyView(props.buttonStyle.applyStyle(
        Button(props.title!, role: nil, action: props.onPress ?? {})
          .disabled(props.disabled)
          .applyStyles(props.style)
          .contentShape(Rectangle())
      ))
    }
    return AnyView(props.buttonStyle.applyStyle(
      Button(role: nil, action: props.onPress ?? {}) {
        content()
      }
      .disabled(props.disabled)
      .applyStyles(props.style)
      .contentShape(Rectangle())
    ))
  }
}
