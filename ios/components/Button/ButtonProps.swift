import SwiftUI

public final class ButtonProps: ObservableObject, Decodable {
  @Published public var title: String
  public var style: StyleProps?
  // Events
  public var onPress: (() -> Void)?

  public init(title: String = "Button") {
    self.title = title
  }

  enum CodingKeys: String, CodingKey {
    case title, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ButtonProps) {
    title = other.title
    style = other.style
  }
}
