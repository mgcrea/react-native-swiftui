import SwiftUI

public final class HStackProps: ObservableObject, Decodable {
  @Published public var alignment: VerticalAlignment
  @Published public var spacing: CGFloat?
  @Published public var style: StyleProps?

  enum CodingKeys: String, CodingKey {
    case alignment, spacing, style
  }

  public init(alignment: VerticalAlignment = .center, spacing: CGFloat? = nil) {
    self.alignment = alignment
    self.spacing = spacing
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

  public func merge(from other: HStackProps) {
    alignment = other.alignment
    spacing = other.spacing
    style = other.style
  }
}
