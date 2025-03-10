import SwiftUI

public struct StyleProps: Decodable {
  // ViewStyle
  public var backgroundColor: Color?
  public var padding: CGFloat?
  public var borderColor: Color?
  public var borderWidth: CGFloat?
  public var cornerRadius: CGFloat?
  // TextStyle
  public var color: Color? // alias for foregroundColor
  public var foregroundColor: Color?
  public var fontWeight: Font.Weight?
  public var fontSize: CGFloat?

  enum CodingKeys: String, CodingKey {
    case color, backgroundColor, foregroundColor, padding, borderColor, borderWidth, cornerRadius, fontWeight, fontSize
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    
    // ViewStyle
    backgroundColor = try container.decodeColorIfPresent(forKey: .backgroundColor)
    borderColor = try container.decodeColorIfPresent(forKey: .borderColor)
    borderWidth = try container.decodeIfPresent(CGFloat.self, forKey: .borderWidth)
    cornerRadius = try container.decodeIfPresent(CGFloat.self, forKey: .cornerRadius)
    padding = try container.decodeIfPresent(CGFloat.self, forKey: .padding)
    
    // TextStyle
    color = try container.decodeColorIfPresent(forKey: .color)
    foregroundColor = try container.decodeColorIfPresent(forKey: .foregroundColor)
    fontWeight = try container.decodeFontWeightIfPresent(forKey: .fontWeight)
    fontSize = try container.decodeIfPresent(CGFloat.self, forKey: .fontSize)

  }
}


extension KeyedDecodingContainer {
    func decodeColorIfPresent(forKey key: Key) throws -> Color? {
        if let colorString = try decodeIfPresent(String.self, forKey: key) {
            return Color(fromString: colorString)
        }
        return nil
    }
  
  func decodeFontWeightIfPresent(forKey key: Key) throws -> Font.Weight? {
      // Try decoding as String first.
      if let weightString = try? decodeIfPresent(String.self, forKey: key),
         let weight = Font.Weight(fromString: weightString) {
          return weight
      }
      // Fall back to numeric decoding.
      if let weightNumber = try? decodeIfPresent(Int.self, forKey: key),
         let weight = Font.Weight(fromNumber: weightNumber) {
          return weight
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
      // Map common numeric font weights (similar to CSS).
      switch number {
      case ..<300: self = .ultraLight
      case 300..<400: self = .light
      case 400..<500: self = .regular
      case 500..<600: self = .medium
      case 600..<700: self = .semibold
      case 700..<800: self = .bold
      case 800..<900: self = .heavy
      case 900...: self = .black
      default: return nil
      }
  }
}
