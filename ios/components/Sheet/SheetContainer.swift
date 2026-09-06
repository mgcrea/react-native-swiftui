import SwiftUI

// MARK: - Container

@objc(SheetContainer)
public final class SheetContainer: SwiftUIContainerView {
  private let props: SheetProps

  @objc public var onDismiss: (() -> Void)?
  @objc public var onPrimaryAction: (() -> Void)?
  @objc public var onSecondaryAction: (() -> Void)?

  @objc
  public init(frame _: CGRect) {
    props = SheetProps()
    super.init(rootView: AnyView(EmptyView()))

    props.onDismiss = { [weak self] in
      self?.onDismiss?()
    }
    props.onPrimaryAction = { [weak self] in
      self?.onPrimaryAction?()
    }
    props.onSecondaryAction = { [weak self] in
      self?.onSecondaryAction?()
    }

    // Bound to a local before the closure: `SheetStandaloneContentView(props:
    // self.props)` captured `self` inside an escaping @ViewBuilder stored in
    // `hostingController.rootView`, which `self` owns — a cycle that leaked the
    // container. The other three containers already reference `props` directly.
    let props = props
    hostingController.rootView = AnyView(
      SheetView(props: props) {
        SheetStandaloneContentView(props: props)
      }
    )
  }

  @objc
  public func tearDown() {
    onDismiss = nil
    onPrimaryAction = nil
    onSecondaryAction = nil
    props.onDismiss = nil
    props.onPrimaryAction = nil
    props.onSecondaryAction = nil
    hostingController.rootView = AnyView(EmptyView())
  }

  /// Typed like the other containers. This used to take a `[String: Any]` that
  /// `HybridSheetView` boxed field by field and this side unboxed with `as?`
  /// casts — and the two halves disagreed: an absent `detents` key never reset
  /// the value, while the four string fields did.
  func update(
    isPresented: Bool,
    detents: [String]?,
    title: String?,
    message: String?,
    primaryButtonTitle: String?,
    secondaryButtonTitle: String?
  ) {
    if props.isPresented != isPresented { props.isPresented = isPresented }
    let resolvedDetents = detents ?? SheetProps.defaultDetents
    if props.detents != resolvedDetents { props.detents = resolvedDetents }
    let resolvedTitle = title ?? ""
    if props.title != resolvedTitle { props.title = resolvedTitle }
    let resolvedMessage = message ?? ""
    if props.message != resolvedMessage { props.message = resolvedMessage }
    if props.primaryButtonTitle != primaryButtonTitle { props.primaryButtonTitle = primaryButtonTitle }
    if props.secondaryButtonTitle != secondaryButtonTitle { props.secondaryButtonTitle = secondaryButtonTitle }
  }
}
