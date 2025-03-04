struct StepperNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]? = nil
  let props: StepperProps

  enum PropsCodingKeys: String, CodingKey {
    case value, label, minimum, maximum, step
  }

  init(id: String, props: StepperProps) {
    self.id = id
    self.props = props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)

    let stepperProps = StepperProps()
    stepperProps.value = try propsContainer.decode(Int.self, forKey: .value)
    stepperProps.label = try propsContainer.decodeIfPresent(String.self, forKey: .label) ?? ""
    stepperProps.minimum = try propsContainer.decodeIfPresent(Int.self, forKey: .minimum) ?? 0
    stepperProps.maximum = try propsContainer.decodeIfPresent(Int.self, forKey: .maximum) ?? 100
    stepperProps.step = try propsContainer.decodeIfPresent(Int.self, forKey: .step) ?? 1
    props = stepperProps
  }
}
