import SwiftUI

// MARK: - Props

public final class StepperProps: ObservableObject, Decodable {
  @Published public var value: Int = 0
  @Published public var label: String = ""
  @Published public var minimum: Int = 0
  @Published public var maximum: Int = 100
  @Published public var step: Int = 1
  // Events
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case value, label, minimum, maximum, step
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    value = try container.decodeIfPresent(Int.self, forKey: .value) ?? 0
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    minimum = try container.decodeIfPresent(Int.self, forKey: .minimum) ?? 0
    maximum = try container.decodeIfPresent(Int.self, forKey: .maximum) ?? 100
    step = try container.decodeIfPresent(Int.self, forKey: .step) ?? 1
  }
}
