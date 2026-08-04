import SwiftUI

// MARK: - Props

final class NumberFieldProps: ObservableObject, Decodable {
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

    value = clamped(value)
  }

  /// Clamps into the current `min`/`max` bounds. Single implementation shared by
  /// `init(from:)` and `merge(from:presentKeys:)`, which previously disagreed:
  /// the init path passed the *unclamped* value into the min step, discarding
  /// the max clamp entirely (value: 100, min: 0, max: 10 stayed 100).
  private func clamped(_ value: Double?) -> Double? {
    guard var result = value else {
      return nil
    }
    if let min = min {
      result = Swift.max(result, min)
    }
    if let max = max {
      result = Swift.min(result, max)
    }
    return result
  }

  public func merge(from other: NumberFieldProps, presentKeys: Set<String>) {
    assign(\.label, from: other, key: "label", presentKeys: presentKeys)
    assign(\.labelStyle, from: other, key: "labelStyle", presentKeys: presentKeys)
    assign(\.placeholder, from: other, key: "placeholder", presentKeys: presentKeys)
    assign(\.keyboardType, from: other, key: "keyboardType", presentKeys: presentKeys)
    assign(\.returnKeyType, from: other, key: "returnKeyType", presentKeys: presentKeys)
    assign(\.min, from: other, key: "min", presentKeys: presentKeys)
    assign(\.max, from: other, key: "max", presentKeys: presentKeys)
    assign(\.disabled, from: other, key: "disabled", presentKeys: presentKeys)
    assign(\.formatter, from: other, key: "formatter", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
    // Clamped against the min/max set above, so a single update carrying both
    // bounds and a value applies them in the right order.
    assign(\.value, to: clamped(other.value), key: "value", presentKeys: presentKeys)
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
