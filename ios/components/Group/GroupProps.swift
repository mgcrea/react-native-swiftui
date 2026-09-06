import SwiftUI

public final class GroupProps: NodeProps {
  @Published public var style: StyleProps?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: GroupProps) {
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension GroupProps {
  static let nodeType = "Group"

  static func makeView(props: GroupProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(GroupView(props: props) { childrenView(children) })
  }
}
