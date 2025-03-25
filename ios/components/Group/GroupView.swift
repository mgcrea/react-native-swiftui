import SwiftUI

public struct GroupView<Content: View>: View {
  @ObservedObject public var props: GroupProps
  let content: () -> Content

  public init(props: GroupProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    Group {
      content()
    }
    .applyViewStyles(props.style)
  }
}
