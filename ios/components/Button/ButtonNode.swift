struct ButtonNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]? = nil
  let props: ButtonProps

  enum PropsCodingKeys: String, CodingKey {
    case title
  }

  init(id: String, props: ButtonProps) {
    self.id = id
    self.props = props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)
    let buttonProps = ButtonProps()
    buttonProps.title = try propsContainer.decode(String.self, forKey: .title)
    props = buttonProps
  }
}
