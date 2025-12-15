import SwiftUI

// MARK: - Props

public final class NumberFieldProps: ObservableObject, Decodable {
  @Published public var value: Double? = nil
  @Published public var label: String = ""
  @Published public var labelStyle: StyleProps?
  @Published public var placeholder: String = ""
  @Published public var keyboardType: UIKeyboardType = .decimalPad
  @Published public var returnKeyType: UIReturnKeyType = .default
  @Published public var min: Double? = nil
  @Published public var max: Double? = nil
  @Published public var disabled: Bool = false
  @Published public var formatter: NumberFormatter
  @Published public var style: StyleProps?
  // Events
  public var onChange: ((Double?) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case value, label, labelStyle, placeholder, keyboardType, returnKeyType, min, max, disabled, formatter, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    value = try container.decodeIfPresent(Double.self, forKey: .value) ?? nil
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    placeholder = try container.decodeIfPresent(String.self, forKey: .placeholder) ?? ""
    // Decode keyboardType
    if let keyboardTypeString = try container.decodeIfPresent(String.self, forKey: .keyboardType) {
      switch keyboardTypeString {
      case "default": keyboardType = .default
      case "numberPad": keyboardType = .numberPad
      case "emailAddress": keyboardType = .emailAddress
      case "decimalPad": keyboardType = .decimalPad
      default: keyboardType = .decimalPad
      }
    }
    // Decode returnKeyType
    if let returnKeyTypeString = try container.decodeIfPresent(String.self, forKey: .returnKeyType) {
      switch returnKeyTypeString {
      case "done": returnKeyType = .done
      case "next": returnKeyType = .next
      case "search": returnKeyType = .search
      default: returnKeyType = .default
      }
    }
    min = try container.decodeIfPresent(Double.self, forKey: .min) ?? nil
    max = try container.decodeIfPresent(Double.self, forKey: .max) ?? nil
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    formatter = try container.decodeFormatter(forKey: .formatter)
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)

    if let currentValue = value {
      if max != nil {
        value = enforceMaxValue(currentValue)
      }
      if min != nil {
        value = enforceMinValue(currentValue)
      }
    }
  }

  private func enforceMaxValue(_ value: Double) -> Double {
    if let max = max {
      return Swift.min(value, max)
    }
    return value
  }

  private func enforceMinValue(_ value: Double) -> Double {
    if let min = min {
      return Swift.max(value, min)
    }
    return value
  }

  public func merge(from other: NumberFieldProps) {
    label = other.label
    labelStyle = other.labelStyle
    placeholder = other.placeholder
    keyboardType = other.keyboardType
    returnKeyType = other.returnKeyType
    min = other.min
    max = other.max
    disabled = other.disabled
    formatter = other.formatter
    style = other.style
    // Apply clamping after setting min/max
    if let currentValue = other.value {
      var clampedValue = currentValue
      if let minVal = min {
        clampedValue = Swift.max(clampedValue, minVal)
      }
      if let maxVal = max {
        clampedValue = Swift.min(clampedValue, maxVal)
      }
      value = clampedValue
    } else {
      value = other.value
    }
  }
}

extension KeyedDecodingContainer {
  func decodeFormatter(forKey key: Key) throws -> NumberFormatter {
    if let formatterString = try decodeIfPresent(String.self, forKey: key) {
      switch formatterString.lowercased() {
      case "currency":
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        return formatter
      case "decimal":
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter
      case "percent":
        let formatter = NumberFormatter()
        formatter.numberStyle = .percent
        return formatter
      case "scientific":
        let formatter = NumberFormatter()
        formatter.numberStyle = .scientific
        return formatter
      case "spellOut":
        let formatter = NumberFormatter()
        formatter.numberStyle = .spellOut
        return formatter
      case "ordinal":
        let formatter = NumberFormatter()
        formatter.numberStyle = .ordinal
        return formatter
      case "currencyISOCode":
        let formatter = NumberFormatter()
        formatter.numberStyle = .currencyISOCode
        return formatter
      case "currencyPlural":
        let formatter = NumberFormatter()
        formatter.numberStyle = .currencyPlural
        return formatter
      case "currencyAccounting":
        let formatter = NumberFormatter()
        formatter.numberStyle = .currencyAccounting
        return formatter
      default:
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        return formatter
      }
    }
    let formatter = NumberFormatter()
    formatter.numberStyle = .decimal
    return formatter
  }
}
