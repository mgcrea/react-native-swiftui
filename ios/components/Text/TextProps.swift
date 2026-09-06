import SwiftUI

public final class TextProps: NodeProps {
  @Published public var text: String
  @Published public var alignment: TextAlignment = .leading
  @Published public var style: StyleProps?

  // No `font`/`color` here: both were decoded and merged but never rendered
  // (`TextView` had them commented out), and neither exists in the TS props.
  // Text styling goes through `style`.
  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case text, alignment, style
  }

  public init(text: String = "") {
    self.text = text
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    text = try container.decode(String.self, forKey: .text)
    if let alignmentString = try container.decodeIfPresent(String.self, forKey: .alignment) {
      alignment = alignmentString == "center" ? .center : alignmentString == "trailing" ? .trailing : .leading
    }
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: TextProps) {
    assign(\.text, .text, from: other)
    assign(\.alignment, .alignment, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension TextProps {
  static let nodeType = "Text"

  static func makeView(props: TextProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(TextView(props: props))
  }
}
