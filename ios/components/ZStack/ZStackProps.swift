import SwiftUI

public final class ZStackProps: NodeProps {
  @Published public var alignment: Alignment = .center
  @Published public var style: StyleProps?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case alignment, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    alignment = try container.decodeIfPresent(String.self, forKey: .alignment).flatMap(Alignment.init(name:)) ?? .center
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ZStackProps) {
    assign(\.alignment, .alignment, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension ZStackProps {
  static let nodeType = "ZStack"

  static func makeView(props: ZStackProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(ZStackView(props: props) { childrenView(children) })
  }
}
