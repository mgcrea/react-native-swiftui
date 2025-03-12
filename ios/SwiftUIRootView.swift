// ios/SwiftUIRootView.swift
import Combine
import SwiftUI
import UIKit

final class ContainerProps: ObservableObject {
  @Published private(set) var viewTree: (any SwiftUINode)?
  @Published var pickerSelections: [String: String] = [:]
  @Published var dateSelections: [String: Date] = [:]
  @Published var textFieldValues: [String: String] = [:]
  public var onEvent: ((String, String, String, String?) -> Void)?

  func update(with newDictionary: [String: Any]) {
    if let jsonString = newDictionary["viewTree"] as? String {
      do {
        viewTree = try decodeSwiftUINode(from: jsonString)
        bindEventHandlers(from: viewTree)
      } catch {
        print("Failed to decode view tree: \(error)")
        viewTree = nil
      }
    }
  }

  private func bindEventHandlers(from node: (any SwiftUINode)?) {
    guard let node = node else { return }
    if let picker = node as? GenericNode<PickerProps> {
      picker.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Picker", picker.id, value)
      }
    } else if let stepper = node as? GenericNode<StepperProps> {
      stepper.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Stepper", stepper.id, value)
      }
    } else if let datePicker = node as? GenericNode<DatePickerProps> {
      datePicker.props.onChange = { [weak self] rawValue in
        let value = ISO8601DateFormatter().string(from: rawValue)
        self?.onEvent?("change", "DatePicker", datePicker.id, value)
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
    }
    if let children = node.children {
      children.forEach { bindEventHandlers(from: $0) }
    }
  }
}

@objc(SwiftUIRootView)
public class SwiftUIRootView: SwiftUIContainerView {
  @ObservedObject private var props: ContainerProps
  private var cancellables: Set<AnyCancellable> = []
  @objc public var onEvent: ((NSString, NSString, NSString, NSString?) -> Void)?

  @objc public init(frame _: CGRect) {
    props = ContainerProps()
    super.init(rootView: AnyView(EmptyView()))

    props.onEvent = { [weak self] name, type, id, value in
      self?.onEvent?(name as NSString, type as NSString, id as NSString, value as NSString?)
    }

    props.$viewTree
      .receive(on: DispatchQueue.main)
      .sink { [weak self] node in
        self?.updateSwiftUIView(with: node)
      }
      .store(in: &cancellables)
  }

  @objc public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]?) {
    props.update(with: newDictionary)
  }

  private func updateSwiftUIView(with node: (any SwiftUINode)?) {
    hostingController.rootView = AnyView(
      node.map { AnyView(buildSwiftUIView(from: $0)) } ?? AnyView(Text("Invalid view tree"))
    )
  }

  private func buildSwiftUIView(from node: any SwiftUINode) -> AnyView {
    switch node {
    case let group as GenericNode<EmptyProps>:
      AnyView(Group {
        if let children = group.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      })
    case let hstack as GenericNode<HStackProps>:
      AnyView(HStackView(props: hstack.props, content: {
        if let children = hstack.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      }))
    case let vstack as GenericNode<VStackProps>:
      AnyView(VStackView(props: vstack.props, content: {
        if let children = vstack.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      }))
    case let zstack as GenericNode<ZStackProps>:
      AnyView(ZStackView(props: zstack.props, content: {
        if let children = zstack.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      }))
    case let form as GenericNode<FormProps>:
      AnyView(FormView(props: form.props, content: {
        if let children = form.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      }))
    case let section as GenericNode<SectionProps>:
      AnyView(SectionView(props: section.props, content: {
        if let children = section.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      }))
    case let sheet as GenericNode<SheetProps>:
      AnyView(SheetView(props: sheet.props, content: {
        if let children = sheet.children {
          ForEach(children, id: \.id) { child in
            self.buildSwiftUIView(from: child)
          }
        }
      }))
    case let text as GenericNode<TextProps>:
      AnyView(TextView(props: text.props))
    case let textField as GenericNode<TextFieldProps>:
      AnyView(TextFieldView(props: textField.props))
    case let picker as GenericNode<PickerProps>:
      AnyView(PickerView(props: picker.props))
    case let datePicker as GenericNode<DatePickerProps>:
      AnyView(DatePickerView(props: datePicker.props))
    case let stepper as GenericNode<StepperProps>:
      AnyView(StepperView(props: stepper.props))
    case let button as GenericNode<ButtonProps>:
      AnyView(ButtonView(props: button.props))
    case let toggle as GenericNode<ToggleProps>:
      AnyView(ToggleView(props: toggle.props))
    case let slider as GenericNode<SliderProps>:
      AnyView(SliderView(props: slider.props))
    case let rectangle as GenericNode<RectangleProps>:
      AnyView(RectangleView(props: rectangle.props))
    case let spacer as GenericNode<SpacerProps>:
      AnyView(SpacerView(props: spacer.props))
    default:
      AnyView(EmptyView())
    }
  }

  @objc public func updateChildProps(_ identifier: String, props propsJson: String) {
    guard let node = findNode(withId: identifier, in: props.viewTree) else {
      print("Node with id \(identifier) not found")
      return
    }

    do {
      let decoder = JSONDecoder()
      let updatedPropsData = propsJson.data(using: .utf8)!
      switch node {
      case let button as GenericNode<ButtonProps>:
        let updatedProps = try decoder.decode(ButtonProps.self, from: updatedPropsData)
        button.props.merge(from: updatedProps)

      case let datePicker as GenericNode<DatePickerProps>:
        let updatedProps = try decoder.decode(DatePickerProps.self, from: updatedPropsData)
        datePicker.props.merge(from: updatedProps)

      case let stepper as GenericNode<StepperProps>:
        let updatedProps = try decoder.decode(StepperProps.self, from: updatedPropsData)
        stepper.props.merge(from: updatedProps)

      case let text as GenericNode<TextProps>:
        let updatedProps = try decoder.decode(TextProps.self, from: updatedPropsData)
        text.props.merge(from: updatedProps)

      case let textField as GenericNode<TextFieldProps>:
        let updatedProps = try decoder.decode(TextFieldProps.self, from: updatedPropsData)
        textField.props.merge(from: updatedProps)

      case let toggle as GenericNode<ToggleProps>:
        let updatedProps = try decoder.decode(ToggleProps.self, from: updatedPropsData)
        toggle.props.merge(from: updatedProps)

      case let slider as GenericNode<SliderProps>:
        let updatedProps = try decoder.decode(SliderProps.self, from: updatedPropsData)
        slider.props.merge(from: updatedProps)

      case let picker as GenericNode<PickerProps>:
        let updatedProps = try decoder.decode(PickerProps.self, from: updatedPropsData)
        picker.props.merge(from: updatedProps)

      case let form as GenericNode<FormProps>:
        // FormNode has no props to merge
        print("FormNode has no props to update for id \(identifier)")

      case let section as GenericNode<SectionProps>:
        let updatedProps = try decoder.decode(SectionProps.self, from: updatedPropsData)
        section.props.merge(from: updatedProps)

      case let group as GenericNode<EmptyProps>:
        // GroupNode has no props to merge
        print("GroupNode has no props to update for id \(identifier)")

      case let hstack as GenericNode<HStackProps>:
        let updatedProps = try decoder.decode(HStackProps.self, from: updatedPropsData)
        hstack.props.merge(from: updatedProps)

      case let vstack as GenericNode<VStackProps>:
        let updatedProps = try decoder.decode(VStackProps.self, from: updatedPropsData)
        vstack.props.merge(from: updatedProps)

      case let zstack as GenericNode<ZStackProps>:
        let updatedProps = try decoder.decode(ZStackProps.self, from: updatedPropsData)
        zstack.props.merge(from: updatedProps)

      case let sheet as GenericNode<SheetProps>:
        let updatedProps = try decoder.decode(SheetProps.self, from: updatedPropsData)
        sheet.props.merge(from: updatedProps)
        
      case let rectangle as GenericNode<RectangleProps>:
        let updatedProps = try decoder.decode(RectangleProps.self, from: updatedPropsData)
        rectangle.props.merge(from: updatedProps)

      default:
        print("Unsupported node type for updateChildProps: \(type(of: node))")
      }
    } catch {
      print("Failed to decode props for \(identifier): \(error)")
    }
  }

  private func findNode(withId id: String, in node: (any SwiftUINode)?) -> (any SwiftUINode)? {
    guard let node = node else { return nil }
    if node.id == id { return node }
    if let children = node.children {
      for child in children {
        if let found = findNode(withId: id, in: child) {
          return found
        }
      }
    }
    return nil
  }
}
