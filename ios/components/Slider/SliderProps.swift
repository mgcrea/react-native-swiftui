import SwiftUI

public final class SliderProps: ObservableObject, Decodable {
  @Published public var value: Double
  @Published public var minimum: Double
  @Published public var maximum: Double
  @Published public var step: Double
  @Published public var label: String
  @Published public var labelStyle: StyleProps?
  @Published public var disabled: Bool = false
  // Events
  public var onChange: ((Double) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case value, minimum, maximum, step, label, labelStyle, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    value = try container.decodeIfPresent(Double.self, forKey: .value) ?? 0.0
    minimum = try container.decodeIfPresent(Double.self, forKey: .minimum) ?? 0.0
    maximum = try container.decodeIfPresent(Double.self, forKey: .maximum) ?? 100.0
    step = try container.decodeIfPresent(Double.self, forKey: .step) ?? 1.0
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false

    value = range.clamping(value)
  }

  /// Always-ordered bounds for `Slider(in:)`, which traps when
  /// `lowerBound > upperBound`.
  ///
  /// `merge` sets `minimum` and `maximum` independently, so an update carrying
  /// only one of them (`{minimum: 50}` against `maximum: 10`) transiently
  /// inverts the range. This previously threw during decode instead, which
  /// failed the *whole* tree in one pass and rendered "Invalid view tree" —
  /// too large a blast radius for one bad prop, so it normalizes instead.
  public var range: ClosedRange<Double> {
    ClosedRange(orderedBounds: minimum, maximum)
  }

  public func merge(from other: SliderProps, presentKeys: Set<String>) {
    if presentKeys.contains("minimum") {
      minimum = other.minimum
    }
    if presentKeys.contains("maximum") {
      maximum = other.maximum
    }
    if presentKeys.contains("step") {
      step = other.step
    }
    if presentKeys.contains("label") {
      label = other.label
    }
    if presentKeys.contains("labelStyle") {
      labelStyle = other.labelStyle
    }
    if presentKeys.contains("disabled") {
      disabled = other.disabled
    }
    if presentKeys.contains("value") {
      // Clamped against the bounds set above, so one update may carry both.
      value = range.clamping(other.value)
    }
  }
}
