struct PickerNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]? = nil
  let props: PickerProps

  enum PropsCodingKeys: String, CodingKey {
    case label, selection, options, pickerStyle
  }

  init(id: String, props: PickerProps) {
    self.id = id
    self.props = props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)

    let pickerProps = PickerProps()
    pickerProps.label = try propsContainer.decode(String.self, forKey: .label)
    pickerProps.selection = try propsContainer.decode(String.self, forKey: .selection)
    pickerProps.options = try propsContainer.decode([String].self, forKey: .options)
    if let styleString = try propsContainer.decodeIfPresent(String.self, forKey: .pickerStyle),
       let style = PickerProps.PickerStyle(rawValue: styleString)
    {
      pickerProps.pickerStyle = style
    } else {
      pickerProps.pickerStyle = .wheel
    }
    props = pickerProps
  }
}
