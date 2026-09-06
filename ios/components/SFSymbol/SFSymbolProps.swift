import SwiftUI
import UIKit

/// Driven by `SFSymbolContainer.update` from nitro props. Not a tree node, so
/// not `Decodable`: the conformance it used to carry was never invoked.
public final class SFSymbolProps: ObservableObject {
  @Published var name: String = ""
  @Published var size: Double?
  @Published var textStyle: String?
  @Published var weight: String?
  @Published var scale: String?
  @Published var renderingMode: String?
  @Published var resizeMode: String?
  @Published var variableValue: Double?
  @Published var colors: [String]?

  public init() {}

  // MARK: - Computed Properties for SwiftUI

  var fontValue: Font {
    if let size = size {
      return .system(size: CGFloat(size))
    }
    if let textStyle = textStyle {
      return Font.fromString(textStyle)
    }
    return .body
  }

  var weightValue: Font.Weight? {
    weight.flatMap(Font.Weight.init(fromString:))
  }

  var scaleValue: Image.Scale {
    guard let scale = scale else { return .medium }
    switch scale {
    case "small": return .small
    case "medium": return .medium
    case "large": return .large
    default: return .medium
    }
  }

  var renderingModeValue: SymbolRenderingMode? {
    guard let renderingMode = renderingMode else { return nil }
    switch renderingMode {
    case "monochrome": return .monochrome
    case "hierarchical": return .hierarchical
    case "palette": return .palette
    case "multicolor": return .multicolor
    default: return nil
    }
  }

  enum ResizeMode {
    case contain
    case cover
    case stretch
    case center
  }

  var resizeModeValue: ResizeMode {
    guard let resizeMode = resizeMode else { return .contain }
    switch resizeMode {
    case "contain": return .contain
    case "cover": return .cover
    case "stretch": return .stretch
    case "center": return .center
    default: return .contain
    }
  }

  var colorValues: [Color] {
    guard let colors = colors else { return [] }
    return colors.compactMap { Color(fromCSSName: $0) }
  }

  // MARK: - Computed Properties for UIKit (intrinsic size calculation)

  /// Calculate the intrinsic size using UIKit's UIImage
  var calculatedSize: CGSize {
    let pointSize: CGFloat
    if let size = size {
      pointSize = CGFloat(size)
    } else {
      pointSize = textStyleToPointSize(textStyle)
    }

    let config = UIImage.SymbolConfiguration(pointSize: pointSize, weight: uiImageWeight, scale: uiImageScale)
    guard let uiImage = UIImage(systemName: name, withConfiguration: config) else {
      return CGSize(width: pointSize, height: pointSize)
    }
    return uiImage.size
  }

  private var uiImageWeight: UIImage.SymbolWeight {
    guard let weight = weight else { return .regular }
    switch weight {
    case "ultraLight": return .ultraLight
    case "thin": return .thin
    case "light": return .light
    case "regular": return .regular
    case "medium": return .medium
    case "semibold": return .semibold
    case "bold": return .bold
    case "heavy": return .heavy
    case "black": return .black
    default: return .regular
    }
  }

  private var uiImageScale: UIImage.SymbolScale {
    guard let scale = scale else { return .default }
    switch scale {
    case "small": return .small
    case "medium": return .medium
    case "large": return .large
    default: return .default
    }
  }

  private func textStyleToPointSize(_ style: String?) -> CGFloat {
    guard let style = style else { return UIFont.systemFontSize }
    switch style {
    case "largeTitle": return 34
    case "title": return 28
    case "title2": return 22
    case "title3": return 20
    case "headline": return 17
    case "body": return 17
    case "callout": return 16
    case "subheadline": return 15
    case "footnote": return 13
    case "caption": return 12
    case "caption2": return 11
    default: return UIFont.systemFontSize
    }
  }
}
