import SwiftUI

// MARK: - Props

public final class MultiPickerProps: NodeProps {
  @Published var components: [MultiPickerComponent] = []
  @Published var selections: [String] = []
  @Published var label: String = ""
  @Published var labelStyle: StyleProps?
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
    /// Resolved once at decode time. It was a computed property read twice per
    /// wheel per body evaluation, regenerating up to 10,000 options each time.
    let computedOptions: [MultiPickerOption]

    private enum CodingKeys: String, CodingKey {
      case label, options, width, config
    }

    init(from decoder: Decoder) throws {
      let container = try decoder.container(keyedBy: CodingKeys.self)
      label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
      options = try container.decodeIfPresent([MultiPickerOption].self, forKey: .options) ?? []
      width = try container.decodeIfPresent(CGFloat.self, forKey: .width)
      config = try container.decodeIfPresent(MultiPickerComponentConfig.self, forKey: .config)
      computedOptions = config?.generateOptions() ?? options
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
  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey, CaseIterable {
    case components, selections, label, labelStyle, disabled, style
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    selections = try container.decodeIfPresent([String].self, forKey: .selections) ?? []
    components = try container.decodeIfPresent([MultiPickerComponent].self, forKey: .components) ?? []
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
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

  public func merge(from other: MultiPickerProps) {
    assign(\.selections, .selections, from: other)
    assign(\.components, .components, from: other)
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.disabled, .disabled, from: other)
    assign(\.style, .style, from: other)
    if other.isPresent(.selections) || other.isPresent(.components) {
      normalizeSelectionsToMatchComponents()
    }
  }
}

// MARK: - Node

extension MultiPickerProps {
  static let nodeType = "MultiPicker"

  static func makeView(props: MultiPickerProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(MultiPickerView(props: props))
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", $0) }
    onFocus = { emit("focus", nil) }
    onBlur = { emit("blur", nil) }
  }
}
