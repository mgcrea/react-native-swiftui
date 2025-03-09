import SwiftUI

public struct StyleProps: Decodable {
  public var backgroundColor: Color?
  public var foregroundColor: Color?
  public var padding: CGFloat?

  enum CodingKeys: String, CodingKey {
    case backgroundColor, foregroundColor, padding
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    if let bgColorString = try container.decodeIfPresent(String.self, forKey: .backgroundColor) {
      backgroundColor = Color(hex: bgColorString)
    }
    if let fgColorString = try container.decodeIfPresent(String.self, forKey: .foregroundColor) {
      foregroundColor = Color(hex: fgColorString)
    }
    padding = try container.decodeIfPresent(CGFloat.self, forKey: .padding)
  }
}

// Extension to parse hex color strings
extension Color {
  init?(hex: String) {
    var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
    hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")

    var rgb: UInt64 = 0
    guard Scanner(string: hexSanitized).scanHexInt64(&rgb) else { return nil }

    let red = Double((rgb & 0xFF0000) >> 16) / 255.0
    let green = Double((rgb & 0x00FF00) >> 8) / 255.0
    let blue = Double(rgb & 0x0000FF) / 255.0

    self.init(red: red, green: green, blue: blue)
  }
}
