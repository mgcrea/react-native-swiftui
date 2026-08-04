import SwiftUI

public final class ImageProps: ObservableObject, Decodable {
  @Published var name: String?
  @Published var sourceUri: String?
  @Published var resizeMode: ImageResizeMode
  @Published var tintColor: String?
  @Published var style: StyleProps?

  enum ImageResizeMode: String, CaseIterable {
    case `default`
    case cover
    case contain
    case stretch
    case center

    @ViewBuilder
    func applyResizeMode(_ image: Image) -> some View {
      switch self {
      case .cover:
        image.resizable().scaledToFill()
      case .contain:
        image.resizable().scaledToFit()
      case .stretch:
        image.resizable()
      case .center:
        image
      case .default:
        image
      }
    }
  }

  enum CodingKeys: String, CodingKey {
    // No `isSystemImage`: there is no such property, so the key decoded nothing.
    // System symbols are selected by a `system:` prefix on `name` (see ImageView).
    case name, sourceUri, resizeMode, tintColor, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    name = try container.decodeIfPresent(String.self, forKey: .name)
    sourceUri = try container.decodeIfPresent(String.self, forKey: .sourceUri)
    resizeMode = try ImageResizeMode(rawValue: container.decodeIfPresent(String.self, forKey: .resizeMode) ?? "") ?? .default
    tintColor = try container.decodeIfPresent(String.self, forKey: .tintColor)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ImageProps, presentKeys: Set<String>) {
    assign(\.name, from: other, key: "name", presentKeys: presentKeys)
    assign(\.sourceUri, from: other, key: "sourceUri", presentKeys: presentKeys)
    assign(\.resizeMode, from: other, key: "resizeMode", presentKeys: presentKeys)
    assign(\.tintColor, from: other, key: "tintColor", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
  }
}
