import SwiftUI

public struct StyleProps: Decodable {
  public var backgroundColor: Color?
  public var foregroundColor: Color?
  public var padding: CGFloat?
  public var borderColor: Color?
  public var borderWidth: CGFloat?
  public var cornerRadius: CGFloat?

  enum CodingKeys: String, CodingKey {
    case backgroundColor, foregroundColor, padding, borderColor, borderWidth, cornerRadius
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    if let bgColorString = try container.decodeIfPresent(String.self, forKey: .backgroundColor) {
      backgroundColor = Color(fromString: bgColorString)
    }
    if let fgColorString = try container.decodeIfPresent(String.self, forKey: .foregroundColor) {
      foregroundColor = Color(fromString: fgColorString)
    }
    if let borderColorString = try container.decodeIfPresent(String.self, forKey: .borderColor) {
      borderColor = Color(fromString: borderColorString)
    }
    if let borderWidth = try container.decodeIfPresent(CGFloat.self, forKey: .borderWidth) {
      self.borderWidth = borderWidth
    }
    if let cornerRadius = try container.decodeIfPresent(CGFloat.self, forKey: .cornerRadius) {
      self.cornerRadius = cornerRadius
    }
    padding = try container.decodeIfPresent(CGFloat.self, forKey: .padding)
  }
}
