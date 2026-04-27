import NitroModules
import UIKit

class HybridSheetPickerView: HybridSheetPickerViewSpec {
  // MARK: - HybridView

  var view: UIView { container }

  // MARK: - Private

  private let container: SheetPickerContainer
  private var needsUpdate = false

  // MARK: - Props

  var isPresented: Bool? = nil {
    didSet { needsUpdate = true }
  }

  var title: String? = nil {
    didSet { needsUpdate = true }
  }

  var searchPlaceholder: String? = nil {
    didSet { needsUpdate = true }
  }

  var selectedValue: String? = nil {
    didSet { needsUpdate = true }
  }

  var options: [SheetPickerViewOption]? = nil {
    didSet { needsUpdate = true }
  }

  var autoDismiss: Bool? = nil {
    didSet { needsUpdate = true }
  }

  var onNativeSelect: ((_ value: String) -> Void)? = nil
  var onNativeDismiss: (() -> Void)? = nil

  // MARK: - Lifecycle

  override init() {
    container = SheetPickerContainer(frame: .zero)
    super.init()

    container.onSelect = { [weak self] value in
      self?.onNativeSelect?(value as String)
    }
    container.onDismiss = { [weak self] in
      self?.onNativeDismiss?()
    }
  }

  func beforeUpdate() {
    needsUpdate = false
  }

  func afterUpdate() {
    guard needsUpdate else { return }

    let mappedOptions: [SheetPickerOption] = options?.map {
      SheetPickerOption(label: $0.label ?? $0.value, value: $0.value)
    } ?? []

    container.update(
      isPresented: isPresented ?? false,
      title: title,
      searchPlaceholder: searchPlaceholder,
      selectedValue: selectedValue,
      autoDismiss: autoDismiss ?? true,
      options: mappedOptions
    )
  }
}
