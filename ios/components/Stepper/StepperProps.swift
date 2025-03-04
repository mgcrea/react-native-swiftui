import SwiftUI

// MARK: - Props

public final class StepperProps: ObservableObject {
  @Published public var value: Int
  @Published public var label: String
  @Published public var minimum: Int
  @Published public var maximum: Int
  @Published public var step: Int
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  public init(
    value: Int = 0,
    label: String = "",
    minimum: Int = 0,
    maximum: Int = 100,
    step: Int = 1
  ) {
    self.value = value
    self.label = label
    self.minimum = minimum
    self.maximum = maximum
    self.step = step
  }

  public func update(with newDictionary: [String: Any]) {
    if let value = newDictionary["value"] as? Int {
      if self.value != value {
        self.value = value
        onChange?(String(value)) // Notify change as string
      }
    }
    if let label = newDictionary["label"] as? String {
      self.label = label
    }
    if let minimum = newDictionary["minimum"] as? Int {
      self.minimum = minimum
    }
    if let maximum = newDictionary["maximum"] as? Int {
      self.maximum = maximum
    }
    if let step = newDictionary["step"] as? Int {
      self.step = step
    }
  }
}
