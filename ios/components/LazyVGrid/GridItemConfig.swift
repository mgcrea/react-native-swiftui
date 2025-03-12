import SwiftUI

public struct GridItemConfig: Decodable {
  let type: String // "fixed", "flexible", "adaptive"
  let fixed: CGFloat?
  let minimum: CGFloat?
  let maximum: CGFloat?
  let spacing: CGFloat?
  let alignment: String?

  enum CodingKeys: String, CodingKey {
    case type, fixed, minimum, maximum, spacing, alignment
  }

  func toGridItem() -> GridItem {
    let size: GridItem.Size
    switch type {
    case "fixed":
      size = .fixed(fixed ?? 0)
    case "flexible":
      size = .flexible(minimum: minimum ?? 10, maximum: maximum ?? .infinity)
    case "adaptive":
      size = .adaptive(minimum: minimum ?? 0, maximum: maximum ?? .infinity)
    default:
      size = .flexible() // Fallback
    }
    let alignmentValue = alignment.flatMap { Alignment(from: $0) }
    return GridItem(size, spacing: spacing, alignment: alignmentValue)
  }
}

// Helper to map string alignment to SwiftUI Alignment
private extension Alignment {
  init?(from string: String) {
    switch string {
    case "leading": self = .leading
    case "center": self = .center
    case "trailing": self = .trailing
    default: return nil
    }
  }
}
