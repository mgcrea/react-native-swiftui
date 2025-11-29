import SwiftUI

public struct SFSymbolView: View {
  @ObservedObject public var props: SFSymbolProps

  public init(props: SFSymbolProps) {
    self.props = props
  }

  public var body: some View {
    let image: Image
    if let variableValue = props.variableValue {
      image = Image(systemName: props.name, variableValue: variableValue)
    } else {
      image = Image(systemName: props.name)
    }

    return applyModifiers(to: image)
  }

  @ViewBuilder
  private func applyModifiers(to image: Image) -> some View {
    let styled = image
      .imageScale(props.scaleValue)
      .font(props.fontValue)

    let weighted: some View = {
      if let weight = props.weightValue {
        return AnyView(styled.fontWeight(weight))
      }
      return AnyView(styled)
    }()

    let rendered: some View = {
      if let renderingMode = props.renderingModeValue {
        return AnyView(weighted.symbolRenderingMode(renderingMode))
      }
      return AnyView(weighted)
    }()

    applyColors(to: rendered)
  }

  @ViewBuilder
  private func applyColors(to view: some View) -> some View {
    let colors = props.colorValues

    if colors.isEmpty {
      view
    } else if colors.count == 1 {
      view.foregroundStyle(colors[0])
    } else if colors.count == 2 {
      view.foregroundStyle(colors[0], colors[1])
    } else {
      view.foregroundStyle(colors[0], colors[1], colors[2])
    }
  }
}
