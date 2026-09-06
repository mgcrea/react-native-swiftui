import SwiftUI

public final class LazyVGridProps: NodeProps {
  @Published public var columns: [GridItemConfig]
  @Published public var spacing: CGFloat?
  @Published public var alignment: HorizontalAlignment?
  @Published public var style: StyleProps?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case columns, spacing, alignment, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    columns = try container.decode([GridItemConfig].self, forKey: .columns)
    spacing = try container.decodeIfPresent(CGFloat.self, forKey: .spacing)
    alignment = try container.decodeIfPresent(String.self, forKey: .alignment).flatMap(HorizontalAlignment.init(name:))
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: LazyVGridProps) {
    assign(\.columns, .columns, from: other)
    assign(\.spacing, .spacing, from: other)
    assign(\.alignment, .alignment, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension LazyVGridProps {
  static let nodeType = "LazyVGrid"

  static func makeView(props: LazyVGridProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(LazyVGridView(props: props) { childrenView(children) })
  }
}
