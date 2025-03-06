import SwiftUI

public struct ButtonView: View {
  @ObservedObject public var props: ButtonProps

  public init(props: ButtonProps) {
    self.props = props
  }

  public var body: some View {
    Button(props.title) {
      props.onPress?()
    }
  }
}
