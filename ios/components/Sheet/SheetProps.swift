// ios/components/Sheet/SheetProps.swift
import SwiftUI

public final class SheetProps: ObservableObject, Decodable {
  @Published public var isPresented: Bool = true
  @Published public var detents: [String] = ["medium", "large"]
  // Event for dismissal
  public var onDismiss: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case isPresented, detents
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    isPresented = try container.decodeIfPresent(Bool.self, forKey: .isPresented) ?? false
    detents = try container.decodeIfPresent([String].self, forKey: .detents) ?? ["medium", "large"]
  }

  public func merge(from other: SheetProps) {
    isPresented = other.isPresented
    detents = other.detents
  }

  // Helper to convert to PresentationDetent on iOS 16+
  @available(iOS 16.0, *)
  func presentationDetents() -> Set<PresentationDetent>? {
    return Set(detents.map { string in
      switch string.lowercased() {
      case "medium": return .medium
      case "large": return .large
      default: return .medium
      }
    })
  }
}
