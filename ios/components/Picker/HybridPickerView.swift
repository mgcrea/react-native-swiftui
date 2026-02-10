import NitroModules
import UIKit

class HybridPickerView: HybridPickerViewSpec {
  // MARK: - HybridView

  var view: UIView { container }

  // MARK: - Private

  private let container: PickerContainer
  private var needsUpdate = false

  // MARK: - Props

  var value: String? = nil {
    didSet { needsUpdate = true }
  }

  var selection: String? = nil {
    didSet { needsUpdate = true }
  }

  var label: String? = nil {
    didSet { needsUpdate = true }
  }

  var labelColor: String? = nil {
    didSet { needsUpdate = true }
  }

  var options: [PickerViewOption]? = nil {
    didSet { needsUpdate = true }
  }

  var pickerStyle: String? = nil {
    didSet { needsUpdate = true }
  }

  var controlSize: String? = nil {
    didSet { needsUpdate = true }
  }

  var disabled: Bool? = nil {
    didSet { needsUpdate = true }
  }

  var onNativeChange: ((_ value: String) -> Void)? = nil

  // MARK: - Lifecycle

  override init() {
    container = PickerContainer(frame: .zero)
    super.init()

    container.onChange = { [weak self] value in
      self?.onNativeChange?(value as String)
    }
  }

  func beforeUpdate() {
    needsUpdate = false
  }

  func afterUpdate() {
    guard needsUpdate else { return }

    let resolvedSelection = (value?.isEmpty == false ? value : selection) ?? ""

    var optionsArray: [[String: Any]] = []
    if let options = options {
      for option in options {
        var dict: [String: Any] = [
          "value": option.value,
          "label": option.label ?? option.value,
        ]
        if let icon = option.icon {
          dict["icon"] = icon
        }
        optionsArray.append(dict)
      }
    }

    var dict: [String: Any] = [
      "selection": resolvedSelection,
      "label": label ?? "",
      "options": optionsArray,
      "pickerStyle": pickerStyle ?? "default",
      "disabled": disabled ?? false,
    ]

    if let labelColor = labelColor {
      dict["labelColor"] = labelColor
    }

    if let controlSize = controlSize {
      dict["controlSize"] = controlSize
    }

    container.updateProps(with: dict, oldDictionary: [:])
  }
}
