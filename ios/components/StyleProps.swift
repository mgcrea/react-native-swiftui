import SwiftUI

public struct StyleProps: Decodable {
  // ViewStyle
  public var color: ColorValue? // alias for foregroundColor
  public var accentColor: ColorValue?
  public var tintColor: ColorValue?
  public var foregroundColor: ColorValue?
  public var backgroundColor: ColorValue?
  public var preferredColorScheme: ColorScheme?
  // - Frame
  public var width: Size?
  public var minWidth: Size?
  public var maxWidth: Size?
  public var height: Size?
  public var minHeight: Size?
  public var maxHeight: Size?
  // - Position
  public var position: String? // "absolute" or "relative"
  public var top: CGFloat?
  public var left: CGFloat?
  public var bottom: CGFloat?
  public var right: CGFloat?
  // - Padding
  public var padding: CGFloat?
  public var paddingHorizontal: CGFloat?
  public var paddingVertical: CGFloat?
  public var paddingLeft: CGFloat?
  public var paddingRight: CGFloat?
  public var paddingTop: CGFloat?
  public var paddingBottom: CGFloat?
  // - Border
  public var borderColor: ColorValue?
  public var borderWidth: CGFloat?
  public var borderRadius: CGFloat?
  public var cornerRadius: CGFloat?
  // TextStyle
  public var fontWeight: Font.Weight?
  public var fontSize: CGFloat?
  public var font: Font?
  public var fontFamily: String?
  public var textAlign: TextAlignment?

  enum CodingKeys: String, CodingKey {
    case color, accentColor, tintColor, backgroundColor, preferredColorScheme, foregroundColor, width, minWidth, maxWidth, height, minHeight, maxHeight, position, top, left, bottom, right, padding, paddingHorizontal, paddingVertical, paddingLeft, paddingRight, paddingTop, paddingBottom, borderColor, borderWidth, borderRadius, cornerRadius, fontWeight, fontSize, font, fontFamily, textAlign
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)

    // ViewStyle
    color = try container.decodeIfPresent(ColorValue.self, forKey: .color) // alias for foregroundColor
    accentColor = try container.decodeIfPresent(ColorValue.self, forKey: .accentColor)
    tintColor = try container.decodeIfPresent(ColorValue.self, forKey: .tintColor)
    foregroundColor = try container.decodeIfPresent(ColorValue.self, forKey: .foregroundColor)
    backgroundColor = try container.decodeIfPresent(ColorValue.self, forKey: .backgroundColor)
    preferredColorScheme = try container.decodeColorSchemeIfPresent(forKey: .preferredColorScheme)
    // - Frame
    width = try container.decodeIfPresent(Size.self, forKey: .width)
    minWidth = try container.decodeIfPresent(Size.self, forKey: .minWidth)
    maxWidth = try container.decodeIfPresent(Size.self, forKey: .maxWidth)
    height = try container.decodeIfPresent(Size.self, forKey: .height)
    minHeight = try container.decodeIfPresent(Size.self, forKey: .minHeight)
    maxHeight = try container.decodeIfPresent(Size.self, forKey: .maxHeight)
    // - Position
    position = try container.decodeIfPresent(String.self, forKey: .position)
    top = try container.decodeIfPresent(CGFloat.self, forKey: .top)
    left = try container.decodeIfPresent(CGFloat.self, forKey: .left)
    bottom = try container.decodeIfPresent(CGFloat.self, forKey: .bottom)
    right = try container.decodeIfPresent(CGFloat.self, forKey: .right)
    // - Padding
    padding = try container.decodeIfPresent(CGFloat.self, forKey: .padding)
    paddingHorizontal = try container.decodeIfPresent(CGFloat.self, forKey: .paddingHorizontal)
    paddingVertical = try container.decodeIfPresent(CGFloat.self, forKey: .paddingVertical)
    paddingLeft = try container.decodeIfPresent(CGFloat.self, forKey: .paddingLeft)
    paddingRight = try container.decodeIfPresent(CGFloat.self, forKey: .paddingRight)
    paddingTop = try container.decodeIfPresent(CGFloat.self, forKey: .paddingTop)
    paddingBottom = try container.decodeIfPresent(CGFloat.self, forKey: .paddingBottom)
    // - Border
    borderColor = try container.decodeIfPresent(ColorValue.self, forKey: .borderColor)
    borderWidth = try container.decodeIfPresent(CGFloat.self, forKey: .borderWidth)
    borderRadius = try container.decodeIfPresent(CGFloat.self, forKey: .borderRadius) // alias for cornerRadius
    cornerRadius = try container.decodeIfPresent(CGFloat.self, forKey: .cornerRadius)

    // TextStyle
    fontWeight = try container.decodeFontWeightIfPresent(forKey: .fontWeight)
    fontSize = try container.decodeIfPresent(CGFloat.self, forKey: .fontSize)
    font = try container.decodeFontIfPresent(forKey: .font)
    fontFamily = try container.decodeIfPresent(String.self, forKey: .fontFamily)
    textAlign = try container.decodeTextAlignIfPresent(forKey: .textAlign)
  }
}

extension KeyedDecodingContainer {
//  func decodeColorIfPresent(forKey key: Key) throws -> Color? {
//    if let colorString = try decodeIfPresent(String.self, forKey: key) {
//      return Color(fromString: colorString)
//    }
//    return nil
//  }

  func decodeColorSchemeIfPresent(forKey key: Key) throws -> ColorScheme? {
    if let colorScheme = try decodeIfPresent(String.self, forKey: key) {
      return colorScheme.lowercased() == "dark" ? ColorScheme.dark : ColorScheme.light
    }
    return nil
  }

  func decodeFontWeightIfPresent(forKey key: Key) throws -> Font.Weight? {
    // Try decoding as String first.
    if let weightString = try? decodeIfPresent(String.self, forKey: key),
       let weight = Font.Weight(fromString: weightString)
    {
      return weight
    }
    // Fall back to numeric decoding.
    if let weightNumber = try? decodeIfPresent(Int.self, forKey: key),
       let weight = Font.Weight(fromNumber: weightNumber)
    {
      return weight
    }
    return nil
  }

  func decodeFontIfPresent(forKey key: Key) throws -> Font? {
    if let fontString = try decodeIfPresent(String.self, forKey: key) {
      return Font.fromString(fontString)
    }
    return nil
  }

  func decodeTextAlignIfPresent(forKey key: Key) throws -> TextAlignment? {
    if let fontString = try decodeIfPresent(String.self, forKey: key) {
      switch fontString.lowercased() {
      case "left": return .leading
      case "leading": return .leading
      case "center": return .center
      case "right": return .trailing
      case "trailing": return .trailing
      default: return nil
      }
    }
    return nil
  }
}

extension Font.Weight {
  init?(fromString string: String) {
    switch string.lowercased() {
    case "ultralight": self = .ultraLight
    case "thin": self = .thin
    case "light": self = .light
    case "regular": self = .regular
    case "medium": self = .medium
    case "semibold": self = .semibold
    case "bold": self = .bold
    case "heavy": self = .heavy
    case "black": self = .black
    default: return nil
    }
  }

  init?(fromNumber number: Int) {
    switch number {
    case ..<300: self = .ultraLight
    case 300 ..< 400: self = .light
    case 400 ..< 500: self = .regular
    case 500 ..< 600: self = .medium
    case 600 ..< 700: self = .semibold
    case 700 ..< 800: self = .bold
    case 800 ..< 900: self = .heavy
    case 900...: self = .black
    default: return nil
    }
  }
}

extension Font {
  static func fromString(_ string: String) -> Font {
    switch string.lowercased() {
    case "body": return .body
    case "callout": return .callout
    case "caption": return .caption
    case "caption2": return .caption2
    case "footnote": return .footnote
    case "headline": return .headline
    case "largeTitle": return .largeTitle
    case "subheadline": return .subheadline
    case "title": return .title
    case "title2": return .title2
    case "title3": return .title3
    default: return .body // Fallback font
    }
  }
}
