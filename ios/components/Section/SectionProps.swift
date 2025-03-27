import SwiftUI

public final class SectionProps: ObservableObject, Decodable {
//  @Published public var header: [any SwiftUINode]?
//  @Published public var footer: [any SwiftUINode]?
  @Published public var header: String
  @Published public var footer: String
  @Published public var isCollapsed: Bool
  @Published public var style: StyleProps?
  
  enum CodingKeys: String, CodingKey {
    case header, footer, isCollapsed, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
//    header = try container.decodeIfPresent(NodeChildren.self, forKey: .header)?.nodes
//    footer = try container.decodeIfPresent(NodeChildren.self, forKey: .footer)?.nodes
    header = try container.decodeIfPresent(String.self, forKey: .header) ?? ""
    footer = try container.decodeIfPresent(String.self, forKey: .footer) ?? ""
    isCollapsed = try container.decodeIfPresent(Bool.self, forKey: .isCollapsed) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: SectionProps) {
    header = other.header
    footer = other.footer
    isCollapsed = other.isCollapsed
    style = other.style
  }
}
