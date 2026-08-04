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

    /// Upper bound on generated options. See `PickerProps.PickerConfig`.
    private static let maxGeneratedOptions = 10_000

    // Generate options based on numeric configuration
    func generateOptions() -> [MultiPickerOption] {
      // See `PickerProps.PickerConfig.generateOptions`: a `step: 0` from JS
      // previously hung the main thread here.
      guard step > 0, min <= max else {
        return []
      }

      return stride(from: min, through: max, by: step)
        .prefix(Self.maxGeneratedOptions)
        .map { MultiPickerOption(label: "\(prefix)\($0)\(suffix)", value: "\($0)") }
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
    normalizeSelectionsToMatchComponents()
  }

  /// Ensures selections array matches components count by padding or truncating as needed
  private func normalizeSelectionsToMatchComponents() {
    // Pad selections if shorter than components
    while selections.count < components.count {
      let component = components[selections.count]
      let defaultValue = component.computedOptions.first?.value ?? ""
      selections.append(defaultValue)
    }
    // Truncate selections if longer than components
    if selections.count > components.count {
      selections = Array(selections.prefix(components.count))
    }
  }

  public init() {}

  public func merge(from other: MultiPickerProps, presentKeys: Set<String>) {
    assign(\.selections, from: other, key: "selections", presentKeys: presentKeys)
    assign(\.components, from: other, key: "components", presentKeys: presentKeys)
    assign(\.label, from: other, key: "label", presentKeys: presentKeys)
    assign(\.disabled, from: other, key: "disabled", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
    if presentKeys.contains("selections") || presentKeys.contains("components") {
      normalizeSelectionsToMatchComponents()
    }
  }
}
