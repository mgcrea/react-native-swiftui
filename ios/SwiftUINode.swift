// ios/SwiftUINode.swift
import SwiftUI

/// A decoded node of the view tree. The three methods are the type-erased entry
/// points the root uses; `GenericNode<T>` implements each once by forwarding to
/// the props type, so nothing outside this file needs to know a node's concrete
/// props type.
public protocol SwiftUINode: Identifiable {
  var id: String { get }
  var children: [any SwiftUINode]? { get }

  /// Decodes `json` as this node's props type and merges the present keys in.
  func merge(json: Data, using decoder: JSONDecoder) throws
  /// Wires the props' event closures to `onEvent(name, type, id, value)`.
  func bindEvents(onEvent: @escaping (String, String, String, String?) -> Void)
  /// Builds this node's SwiftUI view, children included.
  func makeView() -> AnyView
  /// A copy of this node holding `children`. When `previous` is a node of the
  /// same props type, the copy keeps `previous`'s props *instance* with this
  /// node's props merged in, so the views observing it keep their identity.
  func adopting(previous: (any SwiftUINode)?, children: [any SwiftUINode]?) -> any SwiftUINode
}

/// Generic node struct
struct GenericNode<T: NodeProps>: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?
  let props: T

  enum CodingKeys: String, CodingKey {
    case id, props, children
  }

  init(id: String, children: [any SwiftUINode]?, props: T) {
    self.id = id
    self.children = children
    self.props = props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes
    props = try container.decode(T.self, forKey: .props)
  }

  func merge(json: Data, using decoder: JSONDecoder) throws {
    props.merge(from: try decoder.decode(T.self, from: json))
  }

  func bindEvents(onEvent: @escaping (String, String, String, String?) -> Void) {
    // Only the id string is captured. Capturing the node would capture `props`,
    // and these closures are stored on `props` — a retain cycle.
    let id = id
    props.bindEvents { name, value in
      onEvent(name, T.nodeType, id, value)
    }
  }

  func makeView() -> AnyView {
    T.makeView(props: props, children: children)
  }

  func adopting(previous: (any SwiftUINode)?, children: [any SwiftUINode]?) -> any SwiftUINode {
    if let previous = previous as? GenericNode<T> {
      previous.props.merge(from: props)
      return GenericNode(id: id, children: children, props: previous.props)
    }
    return GenericNode(id: id, children: children, props: props)
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
    guard let makeNode = NodeRegistry.decoders[type] else {
      throw DecodingError.typeMismatch(
        (any SwiftUINode).self,
        DecodingError.Context(
          codingPath: container.codingPath,
          debugDescription: "Unknown node type: \(type)"
        )
      )
    }
    node = try makeNode(decoder)
  }
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

/// Renders a node's children in order. Every container view's body used to
/// carry this `if let` + `ForEach` inline.
@ViewBuilder
func childrenView(_ children: [any SwiftUINode]?) -> some View {
  if let children {
    ForEach(children, id: \.id) { child in
      child.makeView()
    }
  }
}
