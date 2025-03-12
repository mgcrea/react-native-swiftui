import SwiftUI

public final class LazyVGridProps: ObservableObject, Decodable {
  @Published public var columns: [GridItemConfig]
  @Published public var spacing: CGFloat?
  @Published public var alignment: HorizontalAlignment?
  @Published public var style: StyleProps?

  enum CodingKeys: String, CodingKey {
    case columns, spacing, alignment, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    columns = try container.decode([GridItemConfig].self, forKey: .columns)
    spacing = try container.decodeIfPresent(CGFloat.self, forKey: .spacing)
    // Decode alignment
    if let alignmentString = try container.decodeIfPresent(String.self, forKey: .alignment) {
      switch alignmentString {
      case "leading": alignment = .leading
      case "trailing": alignment = .trailing
      default: alignment = .center
      }
    }
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: LazyVGridProps) {
    columns = other.columns
    spacing = other.spacing
    alignment = other.alignment
    style = other.style
  }
}
