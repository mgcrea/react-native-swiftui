import SwiftUI

public final class SpacerProps: ObservableObject, Decodable {
  @Published public var minLength: CGFloat?

  enum CodingKeys: String, CodingKey {
    case minLength
  }

  public init(minLength: CGFloat? = nil) {
    self.minLength = minLength
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    minLength = try container.decodeIfPresent(CGFloat.self, forKey: .minLength)
  }

  public func merge(from other: SpacerProps) {
    minLength = other.minLength
  }
}
