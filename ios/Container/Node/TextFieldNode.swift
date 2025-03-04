struct TextFieldNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]? = nil
  let props: TextFieldProps // Use TextFieldProps

  enum PropsCodingKeys: String, CodingKey {
    case placeholder, text, label, keyboardType
  }

  init(id: String, props: TextFieldProps) {
    self.id = id
    self.props = props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)

    let textFieldProps = TextFieldProps()
    textFieldProps.placeholder = try propsContainer
      .decodeIfPresent(String.self, forKey: .placeholder) ?? ""
    textFieldProps.text = try propsContainer.decode(String.self, forKey: .text)
    textFieldProps.label = try propsContainer.decodeIfPresent(String.self, forKey: .label) ?? ""
    if let keyboardTypeString = try propsContainer.decodeIfPresent(String.self, forKey: .keyboardType) {
      switch keyboardTypeString {
      case "numberPad": textFieldProps.keyboardType = .numberPad
      case "emailAddress": textFieldProps.keyboardType = .emailAddress
      case "decimalPad": textFieldProps.keyboardType = .decimalPad
      default: textFieldProps.keyboardType = .default
      }
    }
    props = textFieldProps
  }
}
