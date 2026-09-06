import SwiftUI

/// The string names JS uses for SwiftUI's alignment types. HStack, VStack,
/// ZStack, LazyVGrid and GridItemConfig each carried their own `switch`.
extension HorizontalAlignment {
  init?(name: String) {
    switch name {
    case "leading": self = .leading
    case "center": self = .center
    case "trailing": self = .trailing
    default: return nil
    }
  }
}

extension VerticalAlignment {
  init?(name: String) {
    switch name {
    case "top": self = .top
    case "center": self = .center
    case "bottom": self = .bottom
    case "firstTextBaseline": self = .firstTextBaseline
    case "lastTextBaseline": self = .lastTextBaseline
    default: return nil
    }
  }
}

extension Alignment {
  init?(name: String) {
    switch name {
    case "topLeading": self = .topLeading
    case "top": self = .top
    case "topTrailing": self = .topTrailing
    case "leading": self = .leading
    case "center": self = .center
    case "trailing": self = .trailing
    case "bottomLeading": self = .bottomLeading
    case "bottom": self = .bottom
    case "bottomTrailing": self = .bottomTrailing
    default: return nil
    }
  }
}
