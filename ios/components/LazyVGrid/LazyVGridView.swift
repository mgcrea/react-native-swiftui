import SwiftUI

public struct LazyVGridView<Content: View>: View {
  @ObservedObject public var props: LazyVGridProps
  let content: () -> Content

  public init(props: LazyVGridProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    LazyVGrid(
      columns: props.columns.map { $0.toGridItem() },
      alignment: props.alignment ?? .center,
      spacing: props.spacing
    ) {
      content()
    }
    .applyViewStyles(props.style)
  }
}
