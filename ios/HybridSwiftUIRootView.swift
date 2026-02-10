import NitroModules
import UIKit

class HybridSwiftUIRootView: HybridSwiftUIRootViewSpec {
  // MARK: - HybridView

  var view: UIView { rootView }

  // MARK: - Private

  private let rootView: SwiftUIRootView
  private var needsUpdate = false

  // MARK: - Props

  var viewTree: String? = nil {
    didSet { needsUpdate = true }
  }

  var onEvent: ((_ name: String, _ value: String, _ type: String, _ id: String) -> Void)? = nil

  // MARK: - Lifecycle

  override init() {
    rootView = SwiftUIRootView(frame: .zero)
    super.init()

    rootView.onEvent = { [weak self] name, type, id, value in
      self?.onEvent?(
        name as String,
        (value as String?) ?? "",
        type as String,
        id as String
      )
    }
  }

  func beforeUpdate() {
    needsUpdate = false
  }

  func afterUpdate() {
    guard needsUpdate else { return }
    if let viewTree = viewTree {
      rootView.updateProps(with: ["viewTree": viewTree], oldDictionary: nil)
    }
  }

  // MARK: - Methods

  func updateChildProps(identifier: String, props: String) throws {
    rootView.updateChildProps(identifier, props: props)
  }
}
