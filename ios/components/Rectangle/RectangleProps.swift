import SwiftUI

public final class RectangleProps: NodeProps {
  @Published public var style: StyleProps?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case style
  }

  public init(style: StyleProps? = nil) {
    self.style = style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: RectangleProps) {
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension RectangleProps {
  static let nodeType = "Rectangle"

  static func makeView(props: RectangleProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(RectangleView(props: props))
  }
}
