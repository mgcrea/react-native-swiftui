import SwiftUI

public final class VStackProps: ObservableObject, Decodable {
  @Published public var alignment: HorizontalAlignment
  @Published public var spacing: CGFloat?

  enum CodingKeys: String, CodingKey {
    case alignment, spacing
  }

  public init(alignment: HorizontalAlignment = .center, spacing: CGFloat? = nil) {
    self.alignment = alignment
    self.spacing = spacing
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
  }

  public func merge(from other: VStackProps) {
    alignment = other.alignment
    spacing = other.spacing
  }
}
