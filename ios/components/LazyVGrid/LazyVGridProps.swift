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

  public func merge(from other: LazyVGridProps, presentKeys: Set<String>) {
    if presentKeys.contains("columns") {
      columns = other.columns
    }
    if presentKeys.contains("spacing") {
      spacing = other.spacing
    }
    if presentKeys.contains("alignment") {
      alignment = other.alignment
    }
    if presentKeys.contains("style") {
      style = other.style
    }
  }
}
