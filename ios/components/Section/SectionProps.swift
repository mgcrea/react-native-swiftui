import SwiftUI

public final class SectionProps: NodeProps {
//  @Published public var header: [any SwiftUINode]?
//  @Published public var footer: [any SwiftUINode]?
  @Published public var header: String
  @Published public var footer: String
  @Published public var isCollapsed: Bool
  @Published public var style: StyleProps?
  
  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case header, footer, isCollapsed, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
//    header = try container.decodeIfPresent(NodeChildren.self, forKey: .header)?.nodes
//    footer = try container.decodeIfPresent(NodeChildren.self, forKey: .footer)?.nodes
    header = try container.decodeIfPresent(String.self, forKey: .header) ?? ""
    footer = try container.decodeIfPresent(String.self, forKey: .footer) ?? ""
    isCollapsed = try container.decodeIfPresent(Bool.self, forKey: .isCollapsed) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: SectionProps) {
    assign(\.header, .header, from: other)
    assign(\.footer, .footer, from: other)
    assign(\.isCollapsed, .isCollapsed, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension SectionProps {
  static let nodeType = "Section"

  static func makeView(props: SectionProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(SectionView(props: props) { childrenView(children) })
  }
}
