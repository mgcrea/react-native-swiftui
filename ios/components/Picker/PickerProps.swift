import SwiftUI

// MARK: - Props

public final class PickerProps: ObservableObject, Decodable {
  @Published var selection: String = ""
  @Published var label: String = ""
  @Published var options: [String] = []
  @Published var pickerStyle: PickerStyle = .default
  @Published var disabled: Bool = false
  // Events
  public var onChange: ((String) -> Void)?

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
    case label, selection, options, pickerStyle, disabled
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    selection = try container.decode(String.self, forKey: .selection)
    options = try container.decode([String].self, forKey: .options)
    if let styleString = try container.decodeIfPresent(String.self, forKey: .pickerStyle),
       let style = PickerStyle(rawValue: styleString)
    {
      pickerStyle = style
    } else {
      pickerStyle = .default // Default fallback
    }
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
  }

  public init() {}

  public func merge(from other: PickerProps) {
    for key in CodingKeys.allCases {
      switch key {
      case .label: label = other.label
      case .selection: selection = other.selection
      case .options: options = other.options
      case .pickerStyle: pickerStyle = other.pickerStyle
      case .disabled: disabled = other.disabled
      }
    }
  }
}
