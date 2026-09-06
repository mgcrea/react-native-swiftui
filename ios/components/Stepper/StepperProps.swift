import SwiftUI

// MARK: - Props

public final class StepperProps: NodeProps {
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

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case value, label, labelStyle, minimum, maximum, step, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
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

  public func merge(from other: StepperProps) {
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.minimum, .minimum, from: other)
    assign(\.maximum, .maximum, from: other)
    assign(\.step, .step, from: other)
    assign(\.style, .style, from: other)
    // Applied last, so an update carrying both bounds and a value clamps
    // against the new bounds rather than the old ones.
    assign(\.value, .value, to: range.clamping(other.value), from: other)
  }
}

// MARK: - Node

extension StepperProps {
  static let nodeType = "Stepper"

  static func makeView(props: StepperProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(StepperView(props: props) { childrenView(children) })
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", $0) }
    onFocus = { emit("focus", nil) }
    onBlur = { emit("blur", nil) }
  }
}
