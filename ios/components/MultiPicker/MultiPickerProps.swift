import SwiftUI

// MARK: - Props

public final class MultiPickerProps: ObservableObject, Decodable {
  @Published var components: [MultiPickerComponent] = []
  @Published var selections: [String] = []
  @Published var label: String = ""
  @Published var disabled: Bool = false
  @Published public var style: StyleProps?
  // Events
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  struct MultiPickerComponent: Decodable, Hashable {
    let label: String
    let options: [MultiPickerOption]
    let width: CGFloat?
    let config: MultiPickerComponentConfig?

    var computedOptions: [MultiPickerOption] {
      if config != nil {
        return config!.generateOptions()
      }
      return options
    }
  }

  struct MultiPickerOption: Identifiable, Decodable, Hashable {
    let label: String
    let value: String
    var id: String { value } // Use value as the unique identifier
  }

  struct MultiPickerComponentConfig: Decodable, Hashable {
    let min: Int
    let max: Int
    let step: Int
    let prefix: String
    let suffix: String

    // Generate options based on numeric configuration
    func generateOptions() -> [MultiPickerOption] {
      var options: [MultiPickerOption] = []
      var current = min

      while current <= max {
        let valueString = "\(current)"
        let labelString = "\(prefix)\(current)\(suffix)"
        options.append(MultiPickerOption(label: labelString, value: valueString))
        current += step
      }

      return options
    }
  }

  // Coding keys for decoding
  enum CodingKeys: String, CodingKey, CaseIterable {
    case components, selections, label, disabled, style
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    selections = try container.decodeIfPresent([String].self, forKey: .selections) ?? []
    components = try container.decodeIfPresent([MultiPickerComponent].self, forKey: .components) ?? []
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public init() {}

  public func merge(from other: MultiPickerProps) {
    selections = other.selections
    components = other.components
    label = other.label
    disabled = other.disabled
    style = other.style
  }
}
