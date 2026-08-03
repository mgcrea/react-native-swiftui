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

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    if let isPresented = newDictionary["isPresented"] as? Bool,
       isPresented != props.isPresented
    {
      props.isPresented = isPresented
    }

    if let detents = newDictionary["detents"] as? [String],
       detents != props.detents
    {
      props.detents = detents
    }

    if let title = newDictionary["title"] as? String,
       title != props.title
    {
      props.title = title
    } else if newDictionary["title"] == nil, !props.title.isEmpty {
      props.title = ""
    }

    if let message = newDictionary["message"] as? String,
       message != props.message
    {
      props.message = message
    } else if newDictionary["message"] == nil, !props.message.isEmpty {
      props.message = ""
    }

    if let primaryTitle = newDictionary["primaryButtonTitle"] as? String,
       primaryTitle != props.primaryButtonTitle
    {
      props.primaryButtonTitle = primaryTitle
    } else if newDictionary["primaryButtonTitle"] == nil, props.primaryButtonTitle != nil {
      props.primaryButtonTitle = nil
    }

    if let secondaryTitle = newDictionary["secondaryButtonTitle"] as? String,
       secondaryTitle != props.secondaryButtonTitle
    {
      props.secondaryButtonTitle = secondaryTitle
    } else if newDictionary["secondaryButtonTitle"] == nil, props.secondaryButtonTitle != nil {
      props.secondaryButtonTitle = nil
    }
  }
}
