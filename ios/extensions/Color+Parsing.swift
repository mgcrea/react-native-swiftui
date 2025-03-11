
import SwiftUI

extension Color {
  // Backgrounds
  static let systemBackground = Color(UIColor.systemBackground)
  static let secondarySystemBackground = Color(UIColor.secondarySystemBackground)
  static let tertiarySystemBackground = Color(UIColor.tertiarySystemBackground)
  static let systemGroupedBackground = Color(UIColor.systemGroupedBackground)
  static let secondarySystemGroupedBackground = Color(UIColor.secondarySystemGroupedBackground)
  static let tertiarySystemGroupedBackground = Color(UIColor.tertiarySystemGroupedBackground)

  // Labels
  static let label = Color(UIColor.label)
  static let secondaryLabel = Color(UIColor.secondaryLabel)
  static let tertiaryLabel = Color(UIColor.tertiaryLabel)
  static let quaternaryLabel = Color(UIColor.quaternaryLabel)
  static let placeholderText = Color(UIColor.placeholderText)

  // Fill colors
  static let systemFill = Color(UIColor.systemFill)
  static let secondarySystemFill = Color(UIColor.secondarySystemFill)
  static let tertiarySystemFill = Color(UIColor.tertiarySystemFill)
  static let quaternarySystemFill = Color(UIColor.quaternarySystemFill)

  // Standard colors
  static let systemRed = Color(UIColor.systemRed)
  static let systemBlue = Color(UIColor.systemBlue)
  static let systemGreen = Color(UIColor.systemGreen)
  static let systemOrange = Color(UIColor.systemOrange)
  static let systemYellow = Color(UIColor.systemYellow)
  static let systemPink = Color(UIColor.systemPink)
  static let systemPurple = Color(UIColor.systemPurple)
  static let systemTeal = Color(UIColor.systemTeal)
  static let systemIndigo = Color(UIColor.systemIndigo)

  // Grays
  static let systemGray = Color(UIColor.systemGray)
  static let systemGray2 = Color(UIColor.systemGray2)
  static let systemGray3 = Color(UIColor.systemGray3)
  static let systemGray4 = Color(UIColor.systemGray4)
  static let systemGray5 = Color(UIColor.systemGray5)
  static let systemGray6 = Color(UIColor.systemGray6)

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
    // System colors
    "systemBackground": .systemBackground,
    "secondarySystemBackground": .secondarySystemBackground,
    "tertiarySystemBackground": .tertiarySystemBackground,
    "systemGroupedBackground": .systemGroupedBackground,
    "secondarySystemGroupedBackground": .secondarySystemGroupedBackground,
    "tertiarySystemGroupedBackground": .tertiarySystemGroupedBackground,
    "label": .label,
    "secondaryLabel": .secondaryLabel,
    "tertiaryLabel": .tertiaryLabel,
    "quaternaryLabel": .quaternaryLabel,
    "placeholderText": .placeholderText,
    "systemFill": .systemFill,
    "secondarySystemFill": .secondarySystemFill,
    "tertiarySystemFill": .tertiarySystemFill,
    "quaternarySystemFill": .quaternarySystemFill,
    "systemRed": .systemRed,
    "systemBlue": .systemBlue,
    "systemGreen": .systemGreen,
    "systemOrange": .systemOrange,
    "systemYellow": .systemYellow,
    "systemPink": .systemPink,
    "systemPurple": .systemPurple,
    "systemTeal": .systemTeal,
    "systemIndigo": .systemIndigo,
    "systemGray": .systemGray,
    "systemGray2": .systemGray2,
    "systemGray3": .systemGray3,
    "systemGray4": .systemGray4,
    "systemGray5": .systemGray5,
    "systemGray6": .systemGray6,
  ]
  private static func getNamedColor(_ color: String) -> Color? {
    let colorSanitized = color.trimmingCharacters(in: .whitespacesAndNewlines)
    if let namedColor = namedColors[colorSanitized] {
      return namedColor
    }
    return nil
  }

  init?(fromString color: String) {
    if let namedColor = Self.getNamedColor(color) {
      self = namedColor
    } else if let hexColor = Self(hex: color) {
      self = hexColor
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
