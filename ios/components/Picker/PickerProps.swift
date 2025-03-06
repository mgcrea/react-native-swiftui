import SwiftUI

// MARK: - Props

public final class PickerProps: ObservableObject {
  @Published var selection: String = ""
  @Published var label: String = ""
  @Published var options: [String] = []
  @Published var pickerStyle: PickerStyle = .wheel
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

  func update(with newDictionary: [String: Any]) {
    label = newDictionary["label"] as? String ?? ""
    selection = newDictionary["selection"] as? String ?? ""
    options = newDictionary["options"] as? [String] ?? []
    if let styleString = newDictionary["pickerStyle"] as? String,
       let style = PickerStyle(rawValue: styleString)
    {
      pickerStyle = style
    } else {
      pickerStyle = .wheel // Default fallback
    }
  }
}
