import SwiftUI

public struct SFSymbolView: View {
  @ObservedObject public var props: SFSymbolProps

  public init(props: SFSymbolProps) {
    self.props = props
  }

  public var body: some View {
    let image: Image
    if let variableValue = props.variableValue {
      if #available(iOS 16.0, *) {
        image = Image(systemName: props.name, variableValue: variableValue)
      } else {
        // Fallback: variableValue is not supported prior to iOS 16
        image = Image(systemName: props.name)
      }
    } else {
      image = Image(systemName: props.name)
    }

    return applyModifiers(to: image)
  }

  @ViewBuilder
  private func applyModifiers(to image: Image) -> some View {
    // Compute effective font outside of builder-friendly chain
    let baseFont = props.fontValue
    let effectiveFont: Font = {
      // If we have an explicit weight
      if let weight = props.weightValue {
        if #available(iOS 16.0, *) {
          // iOS 16+: we can apply .fontWeight on Image
          return baseFont
        } else {
          // Pre-iOS 16: best-effort only if we know an explicit size from props
          if let size = props.size {
            return .system(size: CGFloat(size), weight: weight)
          } else {
            // We cannot reliably merge a dynamic textStyle font with weight on Image pre-iOS16
            return baseFont
          }
        }
      } else {
        return baseFont
      }
    }()

    // Build a single expression so the opaque type stays consistent
    let view = image
      .imageScale(props.scaleValue)
      .font(effectiveFont)
      .modifier(ConditionalFontWeight(weight: props.weightValue))
      .modifier(ConditionalRenderingMode(renderingMode: props.renderingModeValue))
      .modifier(ConditionalForegroundStyle(colors: props.colorValues))

    view
  }
}

private struct ConditionalFontWeight: ViewModifier {
  let weight: Font.Weight?

  func body(content: Content) -> some View {
    if let weight {
      if #available(iOS 16.0, *) {
        return AnyView(content.fontWeight(weight))
      } else {
        // Pre-iOS 16: weight is already folded into the effective font when possible.
        return AnyView(content)
      }
    } else {
      return AnyView(content)
    }
  }
}

private struct ConditionalRenderingMode: ViewModifier {
  let renderingMode: SymbolRenderingMode?

  func body(content: Content) -> some View {
    guard let renderingMode else { return AnyView(content) }
    if #available(iOS 15.0, *) {
      return AnyView(content.symbolRenderingMode(renderingMode))
    } else {
      return AnyView(content)
    }
  }
}

private struct ConditionalForegroundStyle: ViewModifier {
  let colors: [Color]

  func body(content: Content) -> some View {
    guard !colors.isEmpty else { return AnyView(content) }

    if #available(iOS 15.0, *) {
      switch colors.count {
      case 1:
        return AnyView(content.foregroundStyle(colors[0]))
      case 2:
        return AnyView(content.foregroundStyle(colors[0], colors[1]))
      default:
        return AnyView(content.foregroundStyle(colors[0], colors[1], colors[2]))
      }
    } else {
      // Fallback to a single color on older iOS
      return AnyView(content.foregroundColor(colors[0]))
    }
  }
}
