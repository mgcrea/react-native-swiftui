import SwiftUI

public struct HStackView<Content: View>: View {
  @ObservedObject public var props: HStackProps
  let content: () -> Content

  public init(props: HStackProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    HStack(alignment: props.alignment, spacing: props.spacing) {
      content()
    }
    .applyViewStyles(props.style)
  }
}
