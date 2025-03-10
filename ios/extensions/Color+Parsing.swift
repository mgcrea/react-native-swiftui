
import SwiftUI

extension Color {
  private static let namedColors: [String: Color] = [
    "accentcolor": .accentColor,
    "black": .black,
    "blue": .blue,
    "brown": .brown,
    "clear": .clear,
    "cyan": .cyan,
    "gray": .gray,
    "green": .green,
    "indigo": .indigo,
    "mint": .mint,
    "orange": .orange,
    "pink": .pink,
    "primary": .primary,
    "purple": .purple,
    "red": .red,
    "secondary": .secondary,
    "teal": .teal,
    "white": .white,
    "yellow": .yellow,
  ]
  private static func getNamedColor(_ color: String) -> Color? {
    let color = color.lowercased()
    if let namedColor = namedColors[color] {
      return namedColor
    }
    return nil
  }

  init?(fromString color: String) {
    print("color=\(color)")
    if let namedColor = Self.getNamedColor(color) {
      self = namedColor

      print("namedColor=\(namedColor)")
    } else if let hexColor = Self(hex: color) {
      self = hexColor

      print("hexColor=\(hexColor)")
    } else {
      return nil
    }
  }

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
