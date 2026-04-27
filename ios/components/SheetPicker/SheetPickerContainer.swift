import SwiftUI

@objc(SheetPickerContainer)
public final class SheetPickerContainer: SwiftUIContainerView {
  private let props: SheetPickerProps

  @objc public var onSelect: ((NSString) -> Void)?
  @objc public var onDismiss: (() -> Void)?

  @objc
  public init(frame _: CGRect) {
    props = SheetPickerProps()
    super.init(rootView: AnyView(EmptyView()))

    props.onSelect = { [weak self] value in
      self?.onSelect?(value as NSString)
    }
    props.onDismiss = { [weak self] in
      self?.onDismiss?()
    }

    hostingController.rootView = AnyView(SheetPickerView(props: props))
  }

  public func update(
    isPresented: Bool,
    title: String?,
    searchPlaceholder: String?,
    selectedValue: String?,
    autoDismiss: Bool,
    options: [SheetPickerOption]
  ) {
    let previousPresented = props.isPresented
    if isPresented != props.isPresented {
      // Ignore attempts to re-present during auto-dismiss (race condition from JS state update)
      if isPresented && props.isAutoDismissing {
        props.isAutoDismissing = false
      } else {
        props.isPresented = isPresented
        if previousPresented && !isPresented {
          props.searchText = ""
          props.isAutoDismissing = false
        }
      }
    } else if props.isAutoDismissing, !isPresented {
      // JS confirmed dismiss, reset flag even though isPresented already matches
      props.isAutoDismissing = false
    }

    if let title, title != props.title {
      props.title = title
    }
    if let searchPlaceholder, searchPlaceholder != props.searchPlaceholder {
      props.searchPlaceholder = searchPlaceholder
    }
    if let selectedValue, selectedValue != props.selectedValue {
      props.selectedValue = selectedValue
    }
    if autoDismiss != props.autoDismiss {
      props.autoDismiss = autoDismiss
    }
    if options != props.options {
      props.options = options
    }
  }
}
