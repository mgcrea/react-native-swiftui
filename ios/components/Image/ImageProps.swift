import SwiftUI

public final class ImageProps: NodeProps {
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

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    // No `isSystemImage`: there is no such property, so the key decoded nothing.
    // System symbols are selected by a `system:` prefix on `name` (see ImageView).
    case name, sourceUri, resizeMode, tintColor, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    name = try container.decodeIfPresent(String.self, forKey: .name)
    sourceUri = try container.decodeIfPresent(String.self, forKey: .sourceUri)
    resizeMode = try container.decodeEnum(ImageResizeMode.self, forKey: .resizeMode, default: .default)
    tintColor = try container.decodeIfPresent(String.self, forKey: .tintColor)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ImageProps) {
    assign(\.name, .name, from: other)
    assign(\.sourceUri, .sourceUri, from: other)
    assign(\.resizeMode, .resizeMode, from: other)
    assign(\.tintColor, .tintColor, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension ImageProps {
  static let nodeType = "Image"

  static func makeView(props: ImageProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(ImageView(props: props))
  }
}
