import SwiftUI

// MARK: - Container

@objc(SFSymbolContainer)
public class SFSymbolContainer: SwiftUIContainerView {
  private let props: SFSymbolProps

  @objc
  public init(frame _: CGRect) {
    props = SFSymbolProps()
    super.init(rootView: AnyView(EmptyView()))

    hostingController.rootView = AnyView(SFSymbolView(props: props).fixedSize())
  }

  public func update(
    name: String,
    size: Double?,
    textStyle: String?,
    weight: String?,
    scale: String?,
    renderingMode: String?,
    variableValue: Double?,
    colors: [String]?
  ) {
    if props.name != name { props.name = name }
    if props.size != size { props.size = size }
    if props.textStyle != textStyle { props.textStyle = textStyle }
    if props.weight != weight { props.weight = weight }
    if props.scale != scale { props.scale = scale }
    if props.renderingMode != renderingMode { props.renderingMode = renderingMode }
    if props.variableValue != variableValue { props.variableValue = variableValue }
    if props.colors != colors { props.colors = colors }
  }

  // Expose intrinsic size to React Native layout using UIKit's UIImage sizing
  override public var intrinsicContentSize: CGSize {
    return props.calculatedSize
  }
}
