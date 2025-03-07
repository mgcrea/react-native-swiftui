import SwiftUI

public final class ToggleProps: ObservableObject, Decodable {
  @Published public var isOn: Bool = false
  @Published public var label: String = ""
  @Published public var disabled: Bool = false
  // Events
  public var onChange: ((Bool) -> Void)?

  enum CodingKeys: String, CodingKey {
    case isOn, label, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    isOn = try container.decodeIfPresent(Bool.self, forKey: .isOn) ?? false
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
  }
}
