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

    container.update(
      isPresented: isPresented ?? false,
      detents: detents,
      title: title,
      message: message,
      primaryButtonTitle: primaryButtonTitle,
      secondaryButtonTitle: secondaryButtonTitle
    )
  }

  // Only the root hybrid implemented this, so every standalone view kept its
  // container callbacks and hosting controller alive after React dropped it.
  func onDropView() {
    container.tearDown()
  }
}
