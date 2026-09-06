import SwiftUI

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
    case "largetitle": return .largeTitle
    case "subheadline": return .subheadline
    case "title": return .title
    case "title2": return .title2
    case "title3": return .title3
    default: return .body // Fallback font
    }
  }
}
