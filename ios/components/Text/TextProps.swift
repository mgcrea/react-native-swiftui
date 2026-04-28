import SwiftUI

public final class TextProps: ObservableObject, Decodable {
  @Published public var text: String
  @Published public var font: Font = .body
  @Published public var color: Color = .primary
  @Published public var alignment: TextAlignment = .leading
  @Published public var style: StyleProps?

  enum CodingKeys: String, CodingKey {
    case text, font, color, alignment, style
  }

  public init(text: String = "") {
    self.text = text
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    text = try container.decode(String.self, forKey: .text)
    if let fontString = try container.decodeIfPresent(String.self, forKey: .font) {
      font = fontString == "headline" ? .headline : fontString == "title" ? .title : .body
    }
    if let colorString = try container.decodeIfPresent(String.self, forKey: .color) {
      color = Color(colorString)
    }
    if let alignmentString = try container.decodeIfPresent(String.self, forKey: .alignment) {
      alignment = alignmentString == "center" ? .center : alignmentString == "trailing" ? .trailing : .leading
    }
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: TextProps, presentKeys: Set<String>) {
    if presentKeys.contains("text") {
      text = other.text
    }
    if presentKeys.contains("font") {
      font = other.font
    }
    if presentKeys.contains("color") {
      color = other.color
    }
    if presentKeys.contains("alignment") {
      alignment = other.alignment
    }
    if presentKeys.contains("style") {
      style = other.style
    }
  }
}
