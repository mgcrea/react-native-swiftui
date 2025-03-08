import SwiftUI

public final class ButtonProps: ObservableObject, Decodable {
  @Published public var title: String
  // Events
  public var onPress: (() -> Void)?

  public init(title: String = "Button") {
    self.title = title
  }

  public func update(with newDictionary: [String: Any]) {
    if let title = newDictionary["title"] as? String {
      self.title = title
    }
  }

  enum CodingKeys: String, CodingKey {
    case title
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
  }

  public func merge(from other: ButtonProps) {
    title = other.title
  }
}
