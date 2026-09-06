import SwiftUI

public final class SliderProps: NodeProps {
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

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case value, minimum, maximum, step, label, labelStyle, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
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

  public func merge(from other: SliderProps) {
    assign(\.minimum, .minimum, from: other)
    assign(\.maximum, .maximum, from: other)
    assign(\.step, .step, from: other)
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.disabled, .disabled, from: other)
    // Clamped against the bounds set above, so one update may carry both.
    assign(\.value, .value, to: range.clamping(other.value), from: other)
  }
}

// MARK: - Node

extension SliderProps {
  static let nodeType = "Slider"

  static func makeView(props: SliderProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(SliderView(props: props) { childrenView(children) })
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", String($0)) }
    onFocus = { emit("focus", nil) }
    onBlur = { emit("blur", nil) }
  }
}
