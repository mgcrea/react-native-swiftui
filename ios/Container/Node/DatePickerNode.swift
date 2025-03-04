struct DatePickerNode: SwiftUINode, Decodable {
  let id: String
  let children: [any SwiftUINode]? = nil
  let props: DatePickerProps

  enum PropsCodingKeys: String, CodingKey {
    case label, selection, displayedComponents
  }

  init(id: String, props: DatePickerProps) {
    self.id = id
    self.props = props
  }

  init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: BaseCodingKeys.self)
    id = try container.decode(String.self, forKey: .id)
    let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)

    let datePickerProps = DatePickerProps()
    datePickerProps.label = try propsContainer.decode(String.self, forKey: .label)
    let selectionString = try propsContainer.decode(String.self, forKey: .selection)

    let formatter = ISO8601DateFormatter()
            formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds] // Include milliseconds
            
            guard let date = formatter.date(from: selectionString) else {
                throw DecodingError.dataCorruptedError(
                    forKey: .selection,
                    in: propsContainer,
                    debugDescription: "Invalid date format: \(selectionString)"
                )
            }
            datePickerProps.selection = date
    
    let componentsString = try propsContainer.decode(String.self, forKey: .displayedComponents)
    datePickerProps.displayedComponents = componentsString == "date" ? .date : [.date, .hourAndMinute]
    props = datePickerProps
  }
}
