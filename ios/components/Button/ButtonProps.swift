import SwiftUI

public final class ButtonProps: ObservableObject {
  @Published public var title: String
  public var onPress: (() -> Void)?

  public init(title: String = "Button") {
    self.title = title
  }

  public func update(with newDictionary: [String: Any]) {
    if let title = newDictionary["title"] as? String {
      self.title = title
    }
  }
}
