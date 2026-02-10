import NitroModules
import UIKit

class HybridSheetView: HybridSheetViewSpec {
  // MARK: - HybridView

  var view: UIView { container }

  // MARK: - Private

  private let container: SheetContainer
  private var needsUpdate = false

  // MARK: - Props

  var isPresented: Bool? = nil {
    didSet { needsUpdate = true }
  }

  var detents: [String]? = nil {
    didSet { needsUpdate = true }
  }

  var title: String? = nil {
    didSet { needsUpdate = true }
  }

  var message: String? = nil {
    didSet { needsUpdate = true }
  }

  var primaryButtonTitle: String? = nil {
    didSet { needsUpdate = true }
  }

  var secondaryButtonTitle: String? = nil {
    didSet { needsUpdate = true }
  }

  var onNativeDismiss: (() -> Void)? = nil
  var onNativePrimaryAction: (() -> Void)? = nil
  var onNativeSecondaryAction: (() -> Void)? = nil

  // MARK: - Lifecycle

  override init() {
    container = SheetContainer(frame: .zero)
    super.init()

    container.onDismiss = { [weak self] in
      self?.onNativeDismiss?()
    }
    container.onPrimaryAction = { [weak self] in
      self?.onNativePrimaryAction?()
    }
    container.onSecondaryAction = { [weak self] in
      self?.onNativeSecondaryAction?()
    }
  }

  func beforeUpdate() {
    needsUpdate = false
  }

  func afterUpdate() {
    guard needsUpdate else { return }

    var dict: [String: Any] = [
      "isPresented": isPresented ?? false,
      "detents": detents ?? [],
    ]

    if let title = title {
      dict["title"] = title
    }
    if let message = message {
      dict["message"] = message
    }
    if let primaryButtonTitle = primaryButtonTitle {
      dict["primaryButtonTitle"] = primaryButtonTitle
    }
    if let secondaryButtonTitle = secondaryButtonTitle {
      dict["secondaryButtonTitle"] = secondaryButtonTitle
    }

    container.updateProps(with: dict, oldDictionary: [:])
  }
}
