struct FormNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?

  enum PropsCodingKeys: CodingKey {
    // No additional props for Form
  }

  init(id: String, children: [any SwiftUINode]?) {
    self.id = id
    self.children = children
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes ?? []
  }
}
