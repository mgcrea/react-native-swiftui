
struct SectionNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?
  let header: String?

  enum PropsCodingKeys: String, CodingKey {
    case header
  }

  init(id: String, children: [any SwiftUINode]?, header: String?) {
    self.id = id
    self.children = children
    self.header = header
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes ?? []
    let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)
    header = try propsContainer.decodeIfPresent(String.self, forKey: .header)
  }
}
