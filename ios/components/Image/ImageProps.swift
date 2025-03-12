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
    case name, sourceUri, isSystemImage, resizeMode, tintColor, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    name = try container.decodeIfPresent(String.self, forKey: .name)
    sourceUri = try container.decodeIfPresent(String.self, forKey: .sourceUri)
    resizeMode = try ImageResizeMode(rawValue: container.decodeIfPresent(String.self, forKey: .resizeMode) ?? "") ?? .default
    tintColor = try container.decodeIfPresent(String.self, forKey: .tintColor)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ImageProps) {
    name = other.name
    sourceUri = other.sourceUri
    resizeMode = other.resizeMode
    tintColor = other.tintColor
    style = other.style
  }
}
