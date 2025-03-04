import SwiftUI

// MARK: - Container

@objc(PickerContainer)
public class PickerContainer: SwiftUIContainerView {
  private let props: PickerProps
  @objc public var onChange: ((NSString) -> Void)?

  @objc
  public init(frame _: CGRect) {
    props = PickerProps()
    super.init(rootView: AnyView(EmptyView())) // Temporary rootView

    props.onChange = { [weak self] newValue in
      self?.onChange?(newValue as NSString)
    }
    // Set the real rootView after super.init
    hostingController.rootView = AnyView(PickerView(props: props))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }
}
