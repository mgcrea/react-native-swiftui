// ios/SwiftUINode.swift
import SwiftUI

// Protocol for all SwiftUI nodes
protocol SwiftUINode: Identifiable {
  var id: String { get }
  var children: [any SwiftUINode]? { get }
}

// Generic node struct
struct GenericNode<T: Decodable>: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?
  let props: T

  enum CodingKeys: String, CodingKey {
    case id, props, children
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    // Only decode children if the component supports them (determined by type or props)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes
    props = try container.decode(T.self, forKey: .props)
  }
}

// Wrapper for decoding children array
struct NodeChildren: Decodable {
  let nodes: [any SwiftUINode]

  init(from decoder: Decoder) throws {
    var container = try decoder.unkeyedContainer()
    var nodes: [any SwiftUINode] = []
    while !container.isAtEnd {
      let wrapper = try container.decode(NodeWrapper.self)
      nodes.append(wrapper.node)
    }
    self.nodes = nodes
  }
}

// Wrapper for type discrimination
private struct NodeWrapper: Decodable {
  let node: any SwiftUINode

  enum CodingKeys: String, CodingKey {
    case type
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let type = try container.decode(String.self, forKey: .type)

    switch type {
    case "Button":
      node = try GenericNode<ButtonProps>(from: decoder)
    case "DatePicker":
      node = try GenericNode<DatePickerProps>(from: decoder)
    case "Slider":
      node = try GenericNode<SliderProps>(from: decoder)
    case "TextField":
      node = try GenericNode<TextFieldProps>(from: decoder)
    case "Picker":
      node = try GenericNode<PickerProps>(from: decoder)
    case "Stepper":
      node = try GenericNode<StepperProps>(from: decoder)
    case "Text":
      node = try GenericNode<TextProps>(from: decoder)
    case "Toggle":
      node = try GenericNode<ToggleProps>(from: decoder)
    case "Form":
      node = try GenericNode<FormProps>(from: decoder)
    case "Section":
      node = try GenericNode<SectionProps>(from: decoder)
    case "Group":
      node = try GenericNode<EmptyProps>(from: decoder) // No props for Group
    case "HStack":
      node = try GenericNode<HStackProps>(from: decoder)
    case "VStack":
      node = try GenericNode<VStackProps>(from: decoder)
    case "ZStack":
      node = try GenericNode<ZStackProps>(from: decoder)
    case "Sheet":
      node = try GenericNode<SheetProps>(from: decoder)
    case "Rectangle":
      node = try GenericNode<RectangleProps>(from: decoder)
    case "Spacer":
      node = try GenericNode<SpacerProps>(from: decoder)
    case "Image":
      node = try GenericNode<ImageProps>(from: decoder)
    default:
      throw DecodingError.typeMismatch(
        (any SwiftUINode).self,
        DecodingError.Context(
          codingPath: container.codingPath,
          debugDescription: "Unknown node type: \(type)"
        )
      )
    }
  }
}

// Empty props for components like Group that have no props
final class EmptyProps: ObservableObject, Decodable {
  init() {}
  func merge(from _: EmptyProps) {}
}

// JSON decoding utility
enum JSONDecodingError: Error {
  case invalidJSON
  case parsingFailed(Error)
}

func decodeSwiftUINode(from json: String) throws -> any SwiftUINode {
  guard let jsonData = json.data(using: .utf8) else {
    throw JSONDecodingError.invalidJSON
  }
  do {
    let decoder = JSONDecoder()
    let wrapper = try decoder.decode(NodeWrapper.self, from: jsonData)
    return wrapper.node
  } catch {
    throw JSONDecodingError.parsingFailed(error)
  }
}
