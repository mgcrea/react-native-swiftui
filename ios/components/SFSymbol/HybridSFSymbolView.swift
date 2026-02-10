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

    var dict: [String: Any] = [
      "name": symbolName,
      "textStyle": textStyle ?? "body",
      "weight": weight ?? "regular",
      "scale": scale ?? "medium",
      "renderingMode": renderingMode ?? "monochrome",
    ]

    if let size = size, size > 0 {
      dict["size"] = size
    }

    if let variableValue = variableValue, variableValue >= 0 {
      dict["variableValue"] = variableValue
    }

    if let colors = colors, !colors.isEmpty {
      dict["colors"] = colors
    }

    container.updateProps(with: dict, oldDictionary: [:])
  }
}
