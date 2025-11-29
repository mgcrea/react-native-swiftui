import SwiftUI

public final class SFSymbolProps: ObservableObject, Decodable {
  @Published var name: String = ""
  @Published var size: Double?
  @Published var textStyle: String?
  @Published var weight: String?
  @Published var scale: String?
  @Published var renderingMode: String?
  @Published var variableValue: Double?
  @Published var colors: [String]?

  enum CodingKeys: String, CodingKey {
    case name, size, textStyle, weight, scale, renderingMode, variableValue, colors
  }

  public init() {}

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    name = try container.decodeIfPresent(String.self, forKey: .name) ?? ""
    size = try container.decodeIfPresent(Double.self, forKey: .size)
    textStyle = try container.decodeIfPresent(String.self, forKey: .textStyle)
    weight = try container.decodeIfPresent(String.self, forKey: .weight)
    scale = try container.decodeIfPresent(String.self, forKey: .scale)
    renderingMode = try container.decodeIfPresent(String.self, forKey: .renderingMode)
    variableValue = try container.decodeIfPresent(Double.self, forKey: .variableValue)
    colors = try container.decodeIfPresent([String].self, forKey: .colors)
  }

  public func merge(from other: SFSymbolProps) {
    name = other.name
    size = other.size
    textStyle = other.textStyle
    weight = other.weight
    scale = other.scale
    renderingMode = other.renderingMode
    variableValue = other.variableValue
    colors = other.colors
  }

  // MARK: - Computed Properties for SwiftUI

  var fontValue: Font {
    if let size = size {
      return .system(size: CGFloat(size))
    }
    if let textStyle = textStyle {
      return textStyleToFont(textStyle)
    }
    return .body
  }

  var weightValue: Font.Weight? {
    guard let weight = weight else { return nil }
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
    default: return nil
    }
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

  var colorValues: [Color] {
    guard let colors = colors else { return [] }
    return colors.compactMap { Color(fromCSSName: $0) }
  }

  private func textStyleToFont(_ style: String) -> Font {
    switch style {
    case "largeTitle": return .largeTitle
    case "title": return .title
    case "title2": return .title2
    case "title3": return .title3
    case "headline": return .headline
    case "subheadline": return .subheadline
    case "body": return .body
    case "callout": return .callout
    case "footnote": return .footnote
    case "caption": return .caption
    case "caption2": return .caption2
    default: return .body
    }
  }
}
