import SwiftUI

// MARK: - Props

final class NumberFieldProps: NodeProps {
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

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case value, label, labelStyle, placeholder, keyboardType, returnKeyType, min, max, disabled, formatter, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
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

  public func merge(from other: NumberFieldProps) {
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.placeholder, .placeholder, from: other)
    assign(\.keyboardType, .keyboardType, from: other)
    assign(\.returnKeyType, .returnKeyType, from: other)
    assign(\.min, .min, from: other)
    assign(\.max, .max, from: other)
    assign(\.disabled, .disabled, from: other)
    // `NumberFormatter` compares by identity, so `assign` would republish on
    // every update carrying `formatter`. Compare the one thing that is decoded.
    if other.isPresent(.formatter), formatter.numberStyle != other.formatter.numberStyle {
      formatter = other.formatter
    }
    assign(\.style, .style, from: other)
    // Clamped against the min/max set above, so a single update carrying both
    // bounds and a value applies them in the right order.
    assign(\.value, .value, to: clamped(other.value), from: other)
  }
}

// MARK: - Node

extension NumberFieldProps {
  static let nodeType = "NumberField"

  static func makeView(props: NumberFieldProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(NumberFieldView(props: props))
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", $0.map { String($0) } ?? "") }
    onFocus = { emit("focus", nil) }
    onBlur = { emit("blur", nil) }
  }
}
