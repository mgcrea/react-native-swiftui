struct FormNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?
  let props: FormProps

  enum PropsCodingKeys: CodingKey {
    // No additional props for Form
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes ?? []
    props = FormProps()
  }
}
