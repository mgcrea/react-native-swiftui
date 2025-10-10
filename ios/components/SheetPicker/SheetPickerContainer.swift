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

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    let previousPresented = props.isPresented
    if let isPresented = newDictionary["isPresented"] as? Bool,
       isPresented != props.isPresented
    {
      props.isPresented = isPresented
      if previousPresented && !isPresented {
        props.searchText = ""
      }
    }

    if let title = newDictionary["title"] as? String,
       title != props.title
    {
      props.title = title
    }

    if let searchPlaceholder = newDictionary["searchPlaceholder"] as? String,
       searchPlaceholder != props.searchPlaceholder
    {
      props.searchPlaceholder = searchPlaceholder
    }

    if let selectedValue = newDictionary["selectedValue"] as? String,
       selectedValue != props.selectedValue
    {
      props.selectedValue = selectedValue
    }

    if let autoDismiss = newDictionary["autoDismiss"] as? Bool,
       autoDismiss != props.autoDismiss
    {
      props.autoDismiss = autoDismiss
    }

    if let optionsValue = newDictionary["options"] as? [Any] {
      let parsedOptions = parseOptions(optionsValue)
      if parsedOptions != props.options {
        props.options = parsedOptions
      }
    }
  }

  private func parseOptions(_ rawOptions: [Any]) -> [SheetPickerOption] {
    var parsed: [SheetPickerOption] = []
    parsed.reserveCapacity(rawOptions.count)

    for entry in rawOptions {
      guard let dict = entry as? [String: Any],
            let value = dict["value"] as? String
      else {
        continue
      }
      let label = dict["label"] as? String ?? value
      parsed.append(SheetPickerOption(label: label, value: value))
    }

    return parsed
  }
}
