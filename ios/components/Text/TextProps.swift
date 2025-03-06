import SwiftUI

public final class TextProps: ObservableObject, Decodable {
  @Published public var text: String
  @Published public var font: Font = .body
  @Published public var color: Color = .primary
  @Published public var alignment: TextAlignment = .leading

  enum CodingKeys: String, CodingKey {
    case text, font, color, alignment
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
  }
}
