import Combine
import SwiftUI
import UIKit

// MARK: - Props

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
        // Initialize picker selections from the new tree
        initializeSelections(from: viewTree)
        bindEventHandlers(from: viewTree)
      } catch {
        print("Failed to decode view tree: \(error)")
        viewTree = nil
      }
    }
  }

  private func initializeSelections(from node: (any SwiftUINode)?) {
    guard let node = node else { return }
    if let picker = node as? PickerNode {
      if pickerSelections[picker.id] == nil { // Only set if not already set
        pickerSelections[picker.id] = picker.props.selection
      }
    } else if let datePicker = node as? DatePickerNode {
      if dateSelections[datePicker.id] == nil {
        dateSelections[datePicker.id] = datePicker.props.selection
      }
    } else if let textField = node as? TextFieldNode {
      if textFieldValues[textField.id] == nil {
        textFieldValues[textField.id] = textField.props.text
      }
    }
    if let children = node.children {
      children.forEach { initializeSelections(from: $0) }
    }
  }

  private func bindEventHandlers(from node: (any SwiftUINode)?) {
    guard let node = node else { return }
    if let picker = node as? PickerNode {
      picker.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Picker", picker.id, value)
      }
    } else if let stepper = node as? StepperNode {
      stepper.props.onChange = { [weak self] value in
        self?.onEvent?("change", "Stepper", stepper.id, value)
      }
    } else if let datePicker = node as? DatePickerNode {
      datePicker.props.onChange = { [weak self] rawValue in
        let value = ISO8601DateFormatter().string(from: rawValue)
        self?.onEvent?("change", "DatePicker", datePicker.id, value)
      }
    } else if let textField = node as? TextFieldNode {
      textField.props.onChange = { [weak self] value in
        self?.onEvent?("change", "TextField", textField.id, value)
      }
      textField.props.onFocus = { [weak self] in
        self?.onEvent?("focus", "TextField", textField.id, nil)
      }
      textField.props.onBlur = { [weak self] in
        self?.onEvent?("blur", "TextField", textField.id, nil)
      }
    }
    if let children = node.children {
      children.forEach { bindEventHandlers(from: $0) }
    }
  }
}

// MARK: - Container

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

  @available(*, unavailable)
  required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  @objc public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]?) {
    props.update(with: newDictionary)
  }

  private func updateSwiftUIView(with node: (any SwiftUINode)?) {
    hostingController.rootView = AnyView(
      node.map { AnyView(buildSwiftUIView(from: $0)) } ?? AnyView(Text("Invalid view tree"))
    )
  }

  @ViewBuilder
  private func buildSwiftUIView(from node: any SwiftUINode) -> some View {
    switch node {
    case let group as GroupNode:
      AnyView(
        Group {
          if let children = group.children {
            ForEach(children, id: \.id) { child in
              self.buildSwiftUIView(from: child)
            }
          }
        }
      )

    case let form as FormNode:
      AnyView(FormView(props: form.props, content: {
        if let children = form.children {
                 ForEach(children, id: \.id) { child in
                   self.buildSwiftUIView(from: child)
                 }
               }
      }))

    case let section as SectionNode:
      AnyView(SectionView(props: section.props, content: {
        if let children = section.children {
                 ForEach(children, id: \.id) { child in
                   self.buildSwiftUIView(from: child)
                 }
               }
      }))

    case let textField as TextFieldNode:
      TextFieldView(props: textField.props)

    case let picker as PickerNode:
      PickerView(props: picker.props)

    case let datePicker as DatePickerNode:
      DatePickerView(props: datePicker.props)

    case let stepper as StepperNode:
      StepperView(props: stepper.props)

    default:
      EmptyView()
    }
  }
}
