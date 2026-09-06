import SwiftUI

public struct GridItemConfig: Decodable, Equatable {
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
    let alignmentValue = alignment.flatMap(Alignment.init(name:))
    return GridItem(size, spacing: spacing, alignment: alignmentValue)
  }
}
