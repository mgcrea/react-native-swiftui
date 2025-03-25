import SwiftUI

public final class VStackProps: ObservableObject, Decodable {
  @Published public var alignment: HorizontalAlignment = .center
  @Published public var spacing: CGFloat?
  @Published public var style: StyleProps?

  enum CodingKeys: String, CodingKey {
    case alignment, spacing, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let alignmentString = try container.decodeIfPresent(String.self, forKey: .alignment) ?? "center"
    switch alignmentString {
    case "leading": alignment = .leading
    case "trailing": alignment = .trailing
    default: alignment = .center
    }
    spacing = try container.decodeIfPresent(CGFloat.self, forKey: .spacing)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: VStackProps) {
    alignment = other.alignment
    spacing = other.spacing
    style = other.style
  }
}
