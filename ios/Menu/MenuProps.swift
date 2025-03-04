import SwiftUI

final class MenuProps: ObservableObject {
  @Published var selection: String = ""
  @Published var options: [String] = []

  func update(with newDictionary: [String: Any]) {
    selection = newDictionary["selection"] as? String ?? ""
    options = newDictionary["options"] as? [String] ?? []
  }
}
