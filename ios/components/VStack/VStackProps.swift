import SwiftUI

public final class VStackProps: NodeProps {
  @Published public var alignment: HorizontalAlignment = .center
  @Published public var spacing: CGFloat?
  @Published public var style: StyleProps?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case alignment, spacing, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    alignment = try container.decodeIfPresent(String.self, forKey: .alignment).flatMap(HorizontalAlignment.init(name:)) ?? .center
    spacing = try container.decodeIfPresent(CGFloat.self, forKey: .spacing)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: VStackProps) {
    assign(\.alignment, .alignment, from: other)
    assign(\.spacing, .spacing, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension VStackProps {
  static let nodeType = "VStack"

  static func makeView(props: VStackProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(VStackView(props: props) { childrenView(children) })
  }
}
