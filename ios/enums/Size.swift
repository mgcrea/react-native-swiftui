public enum Size: Decodable {
  case finite(CGFloat)
  case percentage(Double)

  public init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()
    if let value = try? container.decode(CGFloat.self) {
      self = .finite(value)
    } else if let string = try? container.decode(String.self), string.hasSuffix("%") {
      let percentageString = string.trimmingCharacters(in: CharacterSet(charactersIn: "%"))
      if let percentage = Double(percentageString) {
        self = .percentage(percentage / 100.0)
      } else {
        throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid percentage format")
      }
    } else {
      throw DecodingError.dataCorruptedError(in: container, debugDescription: "Invalid size value")
    }
  }

  func calculate(from parentSize: CGFloat) -> CGFloat? {
    switch self {
    case let .finite(value):
      return value
    case let .percentage(fraction):
      return parentSize * CGFloat(fraction)
    }
  }
}
