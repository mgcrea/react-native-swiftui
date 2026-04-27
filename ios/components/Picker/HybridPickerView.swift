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
    let mappedOptions: [PickerProps.PickerOption] = options?.map {
      PickerProps.PickerOption(label: $0.label ?? $0.value, value: $0.value, icon: $0.icon)
    } ?? []
    let resolvedPickerStyle = PickerProps.PickerStyle(rawValue: pickerStyle ?? "") ?? .default
    let resolvedControlSize = controlSize.flatMap { PickerProps.ControlSize(rawValue: $0) }

    container.update(
      selection: resolvedSelection,
      label: label ?? "",
      options: mappedOptions,
      pickerStyle: resolvedPickerStyle,
      controlSize: resolvedControlSize,
      disabled: disabled ?? false
    )
  }
}
