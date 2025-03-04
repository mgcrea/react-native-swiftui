// GroupNode.swift
struct GroupNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?
  let props: [String: Any]? = nil // Group typically has no props

  enum CodingKeys: String, CodingKey {
    case id, children
  }

  init(id: String, children: [any SwiftUINode]? = nil) {
    self.id = id
    self.children = children
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes
  }
}
