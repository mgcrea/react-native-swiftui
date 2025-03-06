struct FormNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]?
  let props: FormProps

  enum PropsCodingKeys: CodingKey {
    // No additional props for Form
  }

  init(id: String, props: FormProps, children: [any SwiftUINode]? = nil) {
    self.id = id
    self.props = props
    self.children = children
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes ?? []

    let formProps = FormProps()
    props = formProps
  }
}
