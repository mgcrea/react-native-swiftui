
import SwiftUI

extension ColorValue.ColorVariant {
  var asColorValue: ColorValue {
    switch self {
    case let .string(str):
      return .string(str)
    case let .semantic(semantic):
      return .semantic(semantic)
    }
  }
}

extension Color {
  // Existing hex parser (if not present, add this)
  init?(hex: String) {
    let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var int: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&int)
    let a, r, g, b: UInt64
    switch hex.count {
    case 3: // RGB (12-bit)
      (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
    case 6: // RGB (24-bit)
      (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
    case 8: // ARGB (32-bit)
      (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
    default:
      return nil
    }
    self.init(
      .sRGB,
      red: Double(r) / 255,
      green: Double(g) / 255,
      blue: Double(b) / 255,
      opacity: Double(a) / 255
    )
  }

  // New initializer for ColorValue
  init(value: ColorValue) {
    switch value {
    case let .string(str):
      // Handle string colors (hex or asset catalog)
      if let uiColor = UIColor(named: str) {
        self = Color(uiColor)
      } else if let hexColor = Color(hex: str) { // Hex color
        self = hexColor
      } else {
        self = .clear // Fallback
      }
    case let .semantic(names):
      // Use first valid system color
      for name in names.semantic {
        if let uiColor = UIColor.systemColor(named: name) {
          self = Color(uiColor)
          return
        }
      }
      self = .clear // Fallback
    case let .dynamic(dynamic):
      let lightColor = Color(value: dynamic.light.asColorValue)
      let darkColor = Color(value: dynamic.dark.asColorValue)
      self = Color(uiColor: UIColor { traitCollection in
        traitCollection.userInterfaceStyle == .dark ? UIColor(darkColor) : UIColor(lightColor)
      })
    }
  }
}

extension UIColor {
  static func systemColor(named name: String) -> UIColor? {
    switch name {
    // Backgrounds
    case "systemBackground": return .systemBackground
    case "secondarySystemBackground": return .secondarySystemBackground
    case "tertiarySystemBackground": return .tertiarySystemBackground
    case "systemGroupedBackground": return .systemGroupedBackground
    case "secondarySystemGroupedBackground": return .secondarySystemGroupedBackground
    case "tertiarySystemGroupedBackground": return .tertiarySystemGroupedBackground
    // Labels
    case "label": return .label
    case "secondaryLabel": return .secondaryLabel
    case "tertiaryLabel": return .tertiaryLabel
    case "quaternaryLabel": return .quaternaryLabel
    case "placeholderText": return .placeholderText
    // Fill colors
    case "systemFill": return .systemFill
    case "secondarySystemFill": return .secondarySystemFill
    case "tertiarySystemFill": return .tertiarySystemFill
    case "quaternarySystemFill": return .quaternarySystemFill
    // Standard colors
    case "systemRed": return .systemRed
    case "systemBlue": return .systemBlue
    case "systemGreen": return .systemGreen
    case "systemOrange": return .systemOrange
    case "systemYellow": return .systemYellow
    case "systemPink": return .systemPink
    case "systemPurple": return .systemPurple
    case "systemTeal": return .systemTeal
    case "systemIndigo": return .systemIndigo
    // Grays
    case "systemGray": return .systemGray
    case "systemGray2": return .systemGray2
    case "systemGray3": return .systemGray3
    case "systemGray4": return .systemGray4
    case "systemGray5": return .systemGray5
    case "systemGray6": return .systemGray6
    // Default
    default: return nil
    }
  }
}

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
}
