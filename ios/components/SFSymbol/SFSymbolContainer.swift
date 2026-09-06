import SwiftUI

// MARK: - Container

@objc(SFSymbolContainer)
public class SFSymbolContainer: SwiftUIContainerView {
  private let props: SFSymbolProps
  /// `props.calculatedSize` builds a `UIImage` to measure the symbol. Auto Layout
  /// asks for `intrinsicContentSize` far more often than the props change, so it
  /// is measured once per update here and served from this cache.
  private var cachedSize: CGSize = .zero

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

    // Without this, a name/size/weight change kept the previous layout size.
    let size = props.calculatedSize
    if size != cachedSize {
      cachedSize = size
      invalidateIntrinsicContentSize()
    }
  }

  @objc
  public func tearDown() {
    hostingController.rootView = AnyView(EmptyView())
  }

  // Expose intrinsic size to React Native layout using UIKit's UIImage sizing
  override public var intrinsicContentSize: CGSize {
    cachedSize
  }
}
