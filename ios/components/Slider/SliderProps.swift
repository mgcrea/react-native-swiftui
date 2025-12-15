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

    // Validate ranges
    if minimum > maximum {
      throw DecodingError.dataCorruptedError(forKey: .minimum, in: container, debugDescription: "Minimum value must be less than or equal to maximum value")
    }
    if value < minimum || value > maximum {
      value = max(minimum, min(maximum, value))
    }
  }

  public func merge(from other: SliderProps) {
    value = other.value
    minimum = other.minimum
    maximum = other.maximum
    step = other.step
    label = other.label
    labelStyle = other.labelStyle
    disabled = other.disabled
  }
}
