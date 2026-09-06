import SwiftUI

public final class ToggleProps: NodeProps {
  @Published public var isOn: Bool = false
  @Published public var label: String = ""
  @Published public var labelStyle: StyleProps?
  @Published public var disabled: Bool = false
  // Events
  public var onChange: ((Bool) -> Void)?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case isOn, label, labelStyle, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    isOn = try container.decodeIfPresent(Bool.self, forKey: .isOn) ?? false
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
  }

  public func merge(from other: ToggleProps) {
    assign(\.isOn, .isOn, from: other)
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.disabled, .disabled, from: other)
  }
}

// MARK: - Node

extension ToggleProps {
  static let nodeType = "Toggle"

  static func makeView(props: ToggleProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(ToggleView(props: props))
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", String($0)) }
  }
}
