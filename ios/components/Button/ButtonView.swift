import SwiftUI

public struct ButtonView: View {
  @ObservedObject public var props: ButtonProps

  public init(props: ButtonProps) {
    self.props = props
  }

  public var body: some View {
    props.buttonStyle.applyStyle(
      Button(props.title) {
        props.onPress?()
      }
      .disabled(props.disabled)
      .applyStyles(props.style)
    )
  }
}
