import SwiftUI

public final class HStackProps: ObservableObject, Decodable {
  @Published public var alignment: VerticalAlignment = .center
  @Published public var spacing: CGFloat?
  @Published public var style: StyleProps?

  enum CodingKeys: String, CodingKey {
    case alignment, spacing, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let alignmentString = try container.decodeIfPresent(String.self, forKey: .alignment) ?? "center"
    switch alignmentString {
    case "top": alignment = .top
    case "bottom": alignment = .bottom
    case "firstTextBaseline": alignment = .firstTextBaseline
    case "lastTextBaseline": alignment = .lastTextBaseline
    default: alignment = .center
    }
    spacing = try container.decodeIfPresent(CGFloat.self, forKey: .spacing)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: HStackProps, presentKeys: Set<String>) {
    assign(\.alignment, from: other, key: "alignment", presentKeys: presentKeys)
    assign(\.spacing, from: other, key: "spacing", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
  }
}
