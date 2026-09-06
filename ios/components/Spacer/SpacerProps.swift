import SwiftUI

public final class SpacerProps: NodeProps {
  @Published public var minLength: CGFloat?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case minLength
  }

  public init(minLength: CGFloat? = nil) {
    self.minLength = minLength
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    minLength = try container.decodeIfPresent(CGFloat.self, forKey: .minLength)
  }

  public func merge(from other: SpacerProps) {
    assign(\.minLength, .minLength, from: other)
  }
}

// MARK: - Node

extension SpacerProps {
  static let nodeType = "Spacer"

  static func makeView(props: SpacerProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(SpacerView(props: props))
  }
}
