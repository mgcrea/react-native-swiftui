import SwiftUI

final class SwiftUIRootProps: ObservableObject {
  @Published private(set) var viewTree: (any SwiftUINode)?
  /// `id` -> node, so `updateChildProps` can look a node up directly. It sits on
  /// the path of every keystroke, and used to walk the whole tree per update.
  /// Built on the same recursion that binds the event handlers, so it costs no
  /// extra traversal, and holds nodes already retained by `viewTree`.
  private(set) var nodeIndex: [String: any SwiftUINode] = [:]
  public var onEvent: ((String, String, String, String?) -> Void)?

  func update(with newDictionary: [String: Any]) {
    if let jsonString = newDictionary["viewTree"] as? String {
      do {
        // Wire the tree up before publishing it, so nothing can observe a tree
        // whose handlers are not yet attached.
        let decoded = try decodeSwiftUINode(from: jsonString)
        nodeIndex = [:]
        indexAndBindEvents(from: decoded)
        viewTree = decoded
      } catch {
        print("Failed to decode view tree: \(error)")
        nodeIndex = [:]
        viewTree = nil
      }
    }
  }

  func tearDown() {
    onEvent = nil
    nodeIndex = [:]
    viewTree = nil
  }

  /// One walk, two jobs: record every node by id and attach its event closures.
  private func indexAndBindEvents(from node: (any SwiftUINode)?) {
    guard let node = node else { return }
    nodeIndex[node.id] = node
    if let picker = node as? GenericNode<PickerProps> {
      picker.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Picker", picker.id, value)
      }
      picker.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "Picker", picker.id, nil)
      }
      picker.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "Picker", picker.id, nil)
      }
    } else if let multiPicker = node as? GenericNode<MultiPickerProps> {
      multiPicker.props.onChange = { [weak self] value in
        self?.onEvent?("change", "MultiPicker", multiPicker.id, value)
      }
      multiPicker.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "MultiPicker", multiPicker.id, nil)
      }
      multiPicker.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "MultiPicker", multiPicker.id, nil)
      }
    } else if let stepper = node as? GenericNode<StepperProps> {
      stepper.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Stepper", stepper.id, value)
      }
      stepper.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "Stepper", stepper.id, nil)
      }
      stepper.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "Stepper", stepper.id, nil)
      }
    } else if let datePicker = node as? GenericNode<DatePickerProps> {
      datePicker.props.onChange = { [weak self] rawValue in
        let value = ISO8601DateFormatter().string(from: rawValue)
        self?.onEvent?("change", "DatePicker", datePicker.id, value)
      }
      datePicker.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "DatePicker", datePicker.id, nil)
      }
      datePicker.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "DatePicker", datePicker.id, nil)
      }
    } else if let textField = node as? GenericNode<TextFieldProps> {
      textField.props.onChange = { [weak self] value in
        self?.onEvent?("change", "TextField", textField.id, value)
      }
      textField.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "TextField", textField.id, nil)
      }
      textField.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "TextField", textField.id, nil)
      }
    } else if let numberField = node as? GenericNode<NumberFieldProps> {
      numberField.props.onChange = { [weak self] rawValue in
        let value = rawValue != nil ? String(rawValue!) : ""
        self?.onEvent?("change", "NumberField", numberField.id, value)
      }
      numberField.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "NumberField", numberField.id, nil)
      }
      numberField.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "NumberField", numberField.id, nil)
      }
    } else if let button = node as? GenericNode<ButtonProps> {
      button.props.onPress = { [weak self] in
        self?.onEvent?("press", "Button", button.id, nil)
      }
    } else if let toggle = node as? GenericNode<ToggleProps> {
      toggle.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Toggle", toggle.id, String(value))
      }
    } else if let slider = node as? GenericNode<SliderProps> {
      slider.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Slider", slider.id, String(value))
      }
      slider.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "Slider", slider.id, nil)
      }
      slider.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "Slider", slider.id, nil)
      }
    } else if let sheet = node as? GenericNode<SheetProps> {
      sheet.props.onDismiss = { [weak self] in
        self?.onEvent?("dismiss", "Sheet", sheet.id, nil)
      }
      sheet.props.onPrimaryAction = { [weak self] in
        self?.onEvent?("primaryAction", "Sheet", sheet.id, nil)
      }
      sheet.props.onSecondaryAction = { [weak self] in
        self?.onEvent?("secondaryAction", "Sheet", sheet.id, nil)
      }
    } else if let sheetPicker = node as? GenericNode<SheetPickerProps> {
      sheetPicker.props.onSelect = { [weak self] value in
        self?.onEvent?("change", "SheetPicker", sheetPicker.id, value)
      }
      sheetPicker.props.onDismiss = { [weak self] in
        self?.onEvent?("dismiss", "SheetPicker", sheetPicker.id, nil)
      }
    }
    if let children = node.children {
      children.forEach { indexAndBindEvents(from: $0) }
    }
  }
}
