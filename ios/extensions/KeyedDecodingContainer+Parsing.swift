import SwiftUI

/// Every custom decode helper the props classes share, in one place. They were
/// spread across four props files, each extending `KeyedDecodingContainer` for
/// its own needs, with the string-to-enum ladder hand-written a sixth time in
/// every class that had a `RawRepresentable` prop.
extension KeyedDecodingContainer {
  /// Decodes a string-backed enum, falling back to `default` when the key is
  /// absent or the value unknown.
  func decodeEnum<T: RawRepresentable>(_: T.Type, forKey key: Key, default fallback: T) throws -> T
    where T.RawValue == String
  {
    try decodeIfPresent(String.self, forKey: key).flatMap(T.init(rawValue:)) ?? fallback
  }
}

extension KeyedDecodingContainer {
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

extension KeyedDecodingContainer {
  func decodeSubmitLabelIfPresent(forKey key: Key) throws -> SubmitLabel? {
    if let submitLabelString = try decodeIfPresent(String.self, forKey: key) {
      switch submitLabelString {
      case "continue":
        return .continue
      case "done":
        return .done
      case "go":
        return .go
      case "join":
        return .join
      case "next":
        return .next
      case "return":
        return .return
      case "route":
        return .route
      case "search":
        return .search
      case "send":
        return .send
      default:
        return nil
      }
    }
    return nil
  }
}

extension KeyedDecodingContainer {
  private static var numberStyles: [String: NumberFormatter.Style] {
    [
      "currency": .currency,
      "decimal": .decimal,
      "percent": .percent,
      "scientific": .scientific,
      "spellout": .spellOut,
      "ordinal": .ordinal,
      "currencyisocode": .currencyISOCode,
      "currencyplural": .currencyPlural,
      "currencyaccounting": .currencyAccounting,
    ]
  }

  func decodeFormatter(forKey key: Key) throws -> NumberFormatter {
    let name = try decodeIfPresent(String.self, forKey: key)?.lowercased()
    let formatter = NumberFormatter()
    formatter.numberStyle = name.flatMap { Self.numberStyles[$0] } ?? .decimal
    return formatter
  }
}

extension KeyedDecodingContainer {
  func decodeDatePickerComponents(forKey key: Key) throws -> DatePickerComponents {
    var datePickerComponents: DatePickerComponents = .date // Default to date
    if let componentArray = try? decodeIfPresent([String].self, forKey: key) {
      // Handle array of components: ["date", "hourAndMinute"]
      datePickerComponents = []
      for component in componentArray {
        switch component.lowercased() {
        case "date":
          datePickerComponents.insert(.date)
        case "hourandminute":
          datePickerComponents.insert(.hourAndMinute)
//        case "era", "epoch":
//          if #available(iOS 16.0, *) {
//            datePickerComponents.insert(.era)
//          }
        default:
          break
        }
      }
    } else if let singleComponent = try? decodeIfPresent(String.self, forKey: key) {
      // Simple single string component
      switch singleComponent.lowercased() {
      case "date":
        datePickerComponents = .date
      case "time":
        datePickerComponents = .hourAndMinute
      case "datetime":
        datePickerComponents = [.date, .hourAndMinute]
//      case "era", "epoch":
//        if #available(iOS 16.0, *) {
//          datePickerComponents = .era
//        }
      default:
        datePickerComponents = .date
      }
    }
    return datePickerComponents
  }
}
