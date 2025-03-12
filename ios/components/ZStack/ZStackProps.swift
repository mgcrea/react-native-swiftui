import SwiftUI

public final class ZStackProps: ObservableObject, Decodable {
  @Published public var alignment: Alignment
  @Published public var style: StyleProps?

  enum CodingKeys: String, CodingKey {
    case alignment
  }

  public init(alignment: Alignment = .center) {
    self.alignment = alignment
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let alignmentString = try container.decodeIfPresent(String.self, forKey: .alignment) ?? "center"
    switch alignmentString {
    case "topLeading": alignment = .topLeading
    case "top": alignment = .top
    case "topTrailing": alignment = .topTrailing
    case "leading": alignment = .leading
    case "trailing": alignment = .trailing
    case "bottomLeading": alignment = .bottomLeading
    case "bottom": alignment = .bottom
    case "bottomTrailing": alignment = .bottomTrailing
    default: alignment = .center
    }
  }

  public func merge(from other: ZStackProps) {
    alignment = other.alignment
  }
}
