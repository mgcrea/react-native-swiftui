import NitroModules
import UIKit

class HybridSFSymbolView: HybridSFSymbolViewSpec {
  // MARK: - HybridView

  var view: UIView { container }

  // MARK: - Private

  private let container: SFSymbolContainer
  private var needsUpdate = false

  // MARK: - Props

  var symbolName: String = "" {
    didSet { needsUpdate = true }
  }

  var size: Double? = nil {
    didSet { needsUpdate = true }
  }

  var textStyle: String? = nil {
    didSet { needsUpdate = true }
  }

  var weight: String? = nil {
    didSet { needsUpdate = true }
  }

  var scale: String? = nil {
    didSet { needsUpdate = true }
  }

  var renderingMode: String? = nil {
    didSet { needsUpdate = true }
  }

  var variableValue: Double? = nil {
    didSet { needsUpdate = true }
  }

  var colors: [String]? = nil {
    didSet { needsUpdate = true }
  }

  // MARK: - Lifecycle

  override init() {
    container = SFSymbolContainer(frame: .zero)
    super.init()
  }

  func beforeUpdate() {
    needsUpdate = false
  }

  func afterUpdate() {
    guard needsUpdate else { return }

    let resolvedSize: Double? = (size ?? 0) > 0 ? size : nil
    let resolvedVariableValue: Double? = (variableValue ?? -1) >= 0 ? variableValue : nil
    let resolvedColors: [String]? = (colors?.isEmpty == false) ? colors : nil

    container.update(
      name: symbolName,
      size: resolvedSize,
      textStyle: textStyle ?? "body",
      weight: weight ?? "regular",
      scale: scale ?? "medium",
      renderingMode: renderingMode ?? "monochrome",
      variableValue: resolvedVariableValue,
      colors: resolvedColors
    )
  }
}
