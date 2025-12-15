import SwiftUI

public final class ToggleProps: ObservableObject, Decodable {
  @Published public var isOn: Bool = false
  @Published public var label: String = ""
  @Published public var labelStyle: StyleProps?
  @Published public var disabled: Bool = false
  // Events
  public var onChange: ((Bool) -> Void)?

  enum CodingKeys: String, CodingKey {
    case isOn, label, labelStyle, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    isOn = try container.decodeIfPresent(Bool.self, forKey: .isOn) ?? false
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
  }

  public func merge(from other: ToggleProps) {
    isOn = other.isOn
    label = other.label
    labelStyle = other.labelStyle
    disabled = other.disabled
  }
}
