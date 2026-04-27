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

    props.isRootView = true
    props.onChange = { [weak self] newValue in
      self?.onChange?(newValue as NSString)
    }
    // Set the real rootView after super.init
    hostingController.rootView = AnyView(PickerView(props: props))
  }

  func update(
    selection: String,
    label: String,
    options: [PickerProps.PickerOption],
    pickerStyle: PickerProps.PickerStyle,
    controlSize: PickerProps.ControlSize?,
    disabled: Bool
  ) {
    if props.selection != selection { props.selection = selection }
    if props.label != label { props.label = label }
    if props.options != options { props.options = options }
    if props.pickerStyle != pickerStyle { props.pickerStyle = pickerStyle }
    if props.controlSize != controlSize { props.controlSize = controlSize }
    if props.disabled != disabled { props.disabled = disabled }
  }
}
