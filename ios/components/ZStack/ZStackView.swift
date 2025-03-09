import SwiftUI

public struct ZStackView<Content: View>: View {
  @ObservedObject public var props: ZStackProps
  let content: () -> Content

  public init(props: ZStackProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    ZStack(alignment: props.alignment) {
      content()
    }
  }
}
