import SwiftUI

// MARK: - Props

public final class StepperProps: ObservableObject, Decodable {
  @Published public var value: Int = 0
  @Published public var label: String = ""
  @Published public var labelStyle: StyleProps?
  @Published public var minimum: Int = 0
  @Published public var maximum: Int = 100
  @Published public var step: Int = 1
  @Published public var style: StyleProps?
  // Events
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case value, label, labelStyle, minimum, maximum, step, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    value = try container.decodeIfPresent(Int.self, forKey: .value) ?? 0
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    minimum = try container.decodeIfPresent(Int.self, forKey: .minimum) ?? 0
    maximum = try container.decodeIfPresent(Int.self, forKey: .maximum) ?? 100
    step = try container.decodeIfPresent(Int.self, forKey: .step) ?? 1
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)

    value = range.clamping(value)
  }

  /// Always-ordered bounds for `Stepper(in:)`, which traps when
  /// `lowerBound > upperBound`. See `SliderProps.range`.
  public var range: ClosedRange<Int> {
    ClosedRange(orderedBounds: minimum, maximum)
  }

  public func merge(from other: StepperProps, presentKeys: Set<String>) {
    assign(\.label, from: other, key: "label", presentKeys: presentKeys)
    assign(\.labelStyle, from: other, key: "labelStyle", presentKeys: presentKeys)
    assign(\.minimum, from: other, key: "minimum", presentKeys: presentKeys)
    assign(\.maximum, from: other, key: "maximum", presentKeys: presentKeys)
    assign(\.step, from: other, key: "step", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
    // Applied last, so an update carrying both bounds and a value clamps
    // against the new bounds rather than the old ones.
    assign(\.value, to: range.clamping(other.value), key: "value", presentKeys: presentKeys)
  }
}
