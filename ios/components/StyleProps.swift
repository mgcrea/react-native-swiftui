import SwiftUI

/// `Equatable` so `merge(from:presentKeys:)` can skip assigning an unchanged
/// value. Without it, every prop update carrying a `style` key republished the
/// `@Published` property and re-rendered the subtree even when nothing changed —
/// and it blocked a uniform compare-before-assign guard in every props class,
/// which is what let JS-driven updates echo back to JS as `onChange`.
public struct StyleProps: Decodable, Equatable {
  // ViewStyle
  public var color: ColorValue? // alias for foregroundColor
  public var accentColor: ColorValue?
  public var tint: ColorValue?
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
    case color, accentColor, tint, tintColor, backgroundColor, preferredColorScheme, foregroundColor, width, minWidth, maxWidth, height, minHeight, maxHeight, position, top, left, bottom, right, padding, paddingHorizontal, paddingVertical, paddingLeft, paddingRight, paddingTop, paddingBottom, borderColor, borderWidth, borderRadius, cornerRadius, fontWeight, fontSize, font, fontFamily, textAlign
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)

    // ViewStyle
    color = try container.decodeIfPresent(ColorValue.self, forKey: .color) // alias for foregroundColor
    accentColor = try container.decodeIfPresent(ColorValue.self, forKey: .accentColor)
    tint = try container.decodeIfPresent(ColorValue.self, forKey: .tint)
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
