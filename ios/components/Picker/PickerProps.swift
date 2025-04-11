import SwiftUI

// MARK: - Props

public final class PickerProps: ObservableObject, Decodable {
  @Published var options: [PickerOption] = []
  @Published var config: PickerConfig?
  @Published var selection: String = ""
  @Published var label: String = ""
  @Published var pickerStyle: PickerStyle = .default
  @Published var disabled: Bool = false
  @Published public var style: StyleProps?
  // Events
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  struct PickerOption: Identifiable, Decodable, Hashable {
    let label: String
    let value: String
    var id: String { value } // Use value as the unique identifier
  }

  struct PickerConfig: Decodable, Hashable {
    let min: Int
    let max: Int
    let step: Int
    let prefix: String
    let suffix: String

    // Generate options based on numeric configuration
    func generateOptions() -> [PickerOption] {
      var options: [PickerOption] = []
      var current = min

      while current <= max {
        let valueString = "\(current)"
        let labelString = "\(prefix)\(current)\(suffix)"
        options.append(PickerOption(label: labelString, value: valueString))
        current += step
      }

      return options
    }
  }

  var computedOptions: [PickerOption] {
    if config != nil {
      return config!.generateOptions()
    }
    return options
  }

  enum PickerStyle: String, CaseIterable {
    case `default`
    case menu
    case segmented
    case wheel
    case inline

    @ViewBuilder
    func applyStyle<V: View>(_ view: V) -> some View {
      switch self {
      case .default:
        view.pickerStyle(DefaultPickerStyle())
      case .menu:
        view.pickerStyle(MenuPickerStyle())
      case .segmented:
        view.pickerStyle(SegmentedPickerStyle())
      case .wheel:
        view.pickerStyle(WheelPickerStyle())
      case .inline:
        view.pickerStyle(InlinePickerStyle())
      }
    }
  }

  // Coding keys for decoding
  enum CodingKeys: String, CodingKey, CaseIterable {
    case label, selection, options, config, pickerStyle, disabled, style
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    selection = try container.decodeIfPresent(String.self, forKey: .selection) ?? ""
    options = try container.decodeIfPresent([PickerOption].self, forKey: .options) ?? []
    config = try container.decodeIfPresent(PickerConfig.self, forKey: .config)
    if let styleString = try container.decodeIfPresent(String.self, forKey: .pickerStyle),
       let style = PickerStyle(rawValue: styleString)
    {
      pickerStyle = style
    } else {
      pickerStyle = .default // Default fallback
    }
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public init() {}

  public func merge(from other: PickerProps) {
    options = other.options
    selection = other.selection
    config = other.config
    label = other.label
    pickerStyle = other.pickerStyle
    disabled = other.disabled
    style = other.style
  }
}
