// ios/components/Sheet/SheetProps.swift
import SwiftUI

public final class SheetProps: ObservableObject, Decodable {
  @Published public var isPresented: Bool = false
  @Published public var detents: [String] = ["medium", "large"]
  @Published public var title: String = ""
  @Published public var message: String = ""
  @Published public var primaryButtonTitle: String?
  @Published public var secondaryButtonTitle: String?
  // Event for dismissal
  public var onDismiss: (() -> Void)?
  public var onPrimaryAction: (() -> Void)?
  public var onSecondaryAction: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case isPresented, detents, title, message, primaryButtonTitle, secondaryButtonTitle
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    isPresented = try container.decodeIfPresent(Bool.self, forKey: .isPresented) ?? false
    detents = try container.decodeIfPresent([String].self, forKey: .detents) ?? ["medium", "large"]
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
    message = try container.decodeIfPresent(String.self, forKey: .message) ?? ""
    primaryButtonTitle = try container.decodeIfPresent(String.self, forKey: .primaryButtonTitle)
    secondaryButtonTitle = try container.decodeIfPresent(String.self, forKey: .secondaryButtonTitle)
  }

  public init() {}

  public func merge(from other: SheetProps, presentKeys: Set<String>) {
    assign(\.isPresented, from: other, key: "isPresented", presentKeys: presentKeys)
    assign(\.detents, from: other, key: "detents", presentKeys: presentKeys)
    assign(\.title, from: other, key: "title", presentKeys: presentKeys)
    assign(\.message, from: other, key: "message", presentKeys: presentKeys)
    assign(\.primaryButtonTitle, from: other, key: "primaryButtonTitle", presentKeys: presentKeys)
    assign(\.secondaryButtonTitle, from: other, key: "secondaryButtonTitle", presentKeys: presentKeys)
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
