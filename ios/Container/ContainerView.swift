import Combine
import SwiftUI
import UIKit

// MARK: - Props

final class ContainerProps: ObservableObject {
  @Published private(set) var viewTree: (any SwiftUINode)?
  @Published var pickerSelections: [String: String] = [:]
  @Published var dateSelections: [String: Date] = [:]
  @Published var textFieldValues: [String: String] = [:]
  public var onChange: ((String, String, String) -> Void)?

  func update(with newDictionary: [String: Any]) {
  
    if let jsonString = newDictionary["viewTree"] as? String {
      do {
        viewTree = try decodeSwiftUINode(from: jsonString)
        // Initialize picker selections from the new tree
        initializeSelections(from: viewTree)
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
      picker.props.onChange = { [weak self] value in
        self?.onChange?(value, "Picker", picker.id)
      }
    } else if let datePicker = node as? DatePickerNode {
      if dateSelections[datePicker.id] == nil {
        dateSelections[datePicker.id] = datePicker.props.selection
      }
      datePicker.props.onChange = { [weak self] value in
        self?.onChange?(ISO8601DateFormatter().string(from: value), "DatePicker", datePicker.id)
      }
    } else if let textField = node as? TextFieldNode {
      if textFieldValues[textField.id] == nil {
        textFieldValues[textField.id] = textField.props.text
      }
      textField.props.onChange = { [weak self] value in
        self?.onChange?(value, "TextField", textField.id)
      }
    }
    if let children = node.children {
      children.forEach { initializeSelections(from: $0) }
    }
  }
}

// MARK: - Container

@objc(ContainerView)
public class ContainerView: SwiftUIContainerView {
  @ObservedObject private var props: ContainerProps
  private var cancellables: Set<AnyCancellable> = []
  @objc public var onChange: ((NSString, NSString, NSString) -> Void)?

  @objc public init(frame _: CGRect) {
    props = ContainerProps()
    super.init(rootView: AnyView(EmptyView()))

    props.onChange = { [weak self] value, type, id in
      self?.onChange?(value as NSString, type as NSString, id as NSString)
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
    if let group = node as? GroupNode {
      if let children = group.children {
        AnyView(
          Group {
            ForEach(children, id: \.id) { child in
              self.buildSwiftUIView(from: child)
            }
          })
      }
    } else if let form = node as? FormNode {
      AnyView(
        Form {
          if let children = form.children {
            ForEach(children, id: \.id) { child in
              self.buildSwiftUIView(from: child)
            }
          }
        }
      )
    } else if let section = node as? SectionNode {
      AnyView(
        Section(header: section.header.map { Text($0) }) {
          if let children = section.children {
            ForEach(children, id: \.id) { child in
              self.buildSwiftUIView(from: child)
            }
          }
        }
      )
    } else if let textField = node as? TextFieldNode {
      TextFieldView(props: textField.props)
    } else if let picker = node as? PickerNode {
      PickerView(props: picker.props)
    } else if let datePicker = node as? DatePickerNode {
  
        DatePickerView(props: datePicker.props)

    } else {
      EmptyView()
    }
  }
}
