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
  // Dictionary of standard HTML/CSS color names
  static let namedColors: [String: UInt32] = [
    // Basic colors
    "black": 0x000000,
    "white": 0xFFFFFF,
    "red": 0xFF0000,
    "green": 0x008000,
    "blue": 0x0000FF,
    "yellow": 0xFFFF00,
    "cyan": 0x00FFFF,
    "magenta": 0xFF00FF,

    // Extended color set
    "aqua": 0x00FFFF,
    "darkblue": 0x00008B,
    "darkgray": 0xA9A9A9,
    "darkgrey": 0xA9A9A9,
    "darkgreen": 0x006400,
    "darkkhaki": 0xBDB76B,
    "darkorange": 0xFF8C00,
    "darkorchid": 0x9932CC,
    "darkred": 0x8B0000,
    "darksalmon": 0xE9967A,
    "darkviolet": 0x9400D3,
    "gray": 0x808080,
    "grey": 0x808080,
    "lightgray": 0xD3D3D3,
    "lightgrey": 0xD3D3D3,
    "lightgreen": 0x90EE90,
    "lightyellow": 0xFFFFE0,
    "lime": 0x00FF00,
    "navy": 0x000080,
    "olive": 0x808000,
    "orange": 0xFFA500,
    "pink": 0xFFC0CB,
    "purple": 0x800080,
    "silver": 0xC0C0C0,
    "teal": 0x008080,
  ]

  /// Built once: `CharacterSet.alphanumerics.inverted` allocates on every access,
  /// and this parser runs on every body evaluation of every coloured view.
  private static let nonAlphanumerics = CharacterSet.alphanumerics.inverted

  init?(fromHex hex: String) {
    let hex = hex.trimmingCharacters(in: Self.nonAlphanumerics)
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

  // Initialize from named color or hex value
  init?(fromCSSName name: String) {
    let lowerCaseName = name.lowercased()

    // The table stores 24-bit RGB, so `transparent` (0x00000000) is
    // indistinguishable from black there and used to render opaque black.
    if lowerCaseName == "transparent" {
      self = .clear
      return
    }

    // Check if it's a named color
    if let hexValue = Color.namedColors[lowerCaseName] {
      let r = (hexValue >> 16) & 0xFF
      let g = (hexValue >> 8) & 0xFF
      let b = hexValue & 0xFF
      let a = (hexValue >> 24) & 0xFF

      self.init(
        .sRGB,
        red: Double(r) / 255,
        green: Double(g) / 255,
        blue: Double(b) / 255,
        opacity: hexValue > 0xFFFFFF ? Double(a) / 255 : 1.0
      )
    } else if let hexColor = Color(fromHex: name) {
      self = hexColor
    } else {
      return nil
    }
  }

  // New initializer for ColorValue
  init(value: ColorValue) {
    switch value {
    case let .string(str):
      // Handle string colors (hex, named, or asset catalog)
      if let uiColor = UIColor.systemColor(name: str) {
        self = Color(uiColor)
      } else if let namedColor = Color(fromCSSName: str) { // Named CSS colour, then hex
        self = namedColor
      } else {
        self = .clear // Fallback
      }
    case let .semantic(names):
      // Use first valid system color
      for name in names.semantic {
        if let uiColor = UIColor.systemColor(name: name) {
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
  private static let systemColorMap: [String: UIColor] = [
    // Backgrounds
    "systemBackground": .systemBackground,
    "secondarySystemBackground": .secondarySystemBackground,
    "tertiarySystemBackground": .tertiarySystemBackground,
    "systemGroupedBackground": .systemGroupedBackground,
    "secondarySystemGroupedBackground": .secondarySystemGroupedBackground,
    "tertiarySystemGroupedBackground": .tertiarySystemGroupedBackground,

    // Labels
    "label": .label,
    "secondaryLabel": .secondaryLabel,
    "tertiaryLabel": .tertiaryLabel,
    "quaternaryLabel": .quaternaryLabel,
    "placeholderText": .placeholderText,

    // Fill colors
    "systemFill": .systemFill,
    "secondarySystemFill": .secondarySystemFill,
    "tertiarySystemFill": .tertiarySystemFill,
    "quaternarySystemFill": .quaternarySystemFill,

    // Standard colors
    "systemRed": .systemRed,
    "systemBlue": .systemBlue,
    "systemGreen": .systemGreen,
    "systemOrange": .systemOrange,
    "systemYellow": .systemYellow,
    "systemPink": .systemPink,
    "systemPurple": .systemPurple,
    "systemTeal": .systemTeal,
    "systemIndigo": .systemIndigo,

    // Grays
    "systemGray": .systemGray,
    "systemGray2": .systemGray2,
    "systemGray3": .systemGray3,
    "systemGray4": .systemGray4,
    "systemGray5": .systemGray5,
    "systemGray6": .systemGray6,
  ]

  static func systemColor(name: String) -> UIColor? {
    return systemColorMap[name]
  }
}
