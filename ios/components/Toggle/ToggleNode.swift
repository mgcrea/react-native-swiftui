struct ToggleNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]? = nil
  let props: ToggleProps

  enum CodingKeys: String, CodingKey {
    case id, props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    props = try container.decode(ToggleProps.self, forKey: .props)
  }
}
