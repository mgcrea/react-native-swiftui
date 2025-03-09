import SwiftUI

public struct VStackView<Content: View>: View {
  @ObservedObject public var props: VStackProps
  let content: () -> Content

  public init(props: VStackProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    VStack(alignment: props.alignment, spacing: props.spacing) {
      content()
    }
  }
}
