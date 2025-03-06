import SwiftUI

// MARK: - Protocols and Base Types

protocol SwiftUINode: Identifiable {
  var id: String { get }
  var children: [any SwiftUINode]? { get }
}

// Base coding keys for all nodes
public enum BaseCodingKeys: String, CodingKey {
  case id, type, children, props
}

// MARK: - Helper for Decoding Children

public struct NodeChildren: Decodable {
  let nodes: [any SwiftUINode]

  public init(from decoder: Decoder) throws {
    var container = try decoder.unkeyedContainer()
    var nodes: [any SwiftUINode] = []
    while !container.isAtEnd {
      let wrapper = try container.decode(NodeWrapper.self)
      nodes.append(wrapper.node)
    }
    self.nodes = nodes
  }
}

// Wrapper to handle type discrimination
private struct NodeWrapper: Decodable {
  let node: any SwiftUINode

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    let type = try container.decode(String.self, forKey: .type)
    print("type = \(type)")

    switch type {
    case "Group":
      node = try GroupNode(from: decoder)
    case "Form":
      node = try FormNode(from: decoder)
    case "Section":
      node = try SectionNode(from: decoder)
    case "TextField":
      node = try TextFieldNode(from: decoder)
    case "Picker":
      node = try PickerNode(from: decoder)
    case "DatePicker":
      node = try DatePickerNode(from: decoder)
    case "Stepper":
      node = try StepperNode(from: decoder)
    case "Button":
      node = try ButtonNode(from: decoder)
    default:
      throw Swift.DecodingError.typeMismatch(
        (any SwiftUINode).self,
        Swift.DecodingError.Context(
          codingPath: container.codingPath,
          debugDescription: "Unknown type: \(type)"
        )
      )
    }
  }
}

// MARK: - JSON Decoder

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
