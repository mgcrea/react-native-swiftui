// ios/components/Sheet/SheetProps.swift
import SwiftUI

public final class SheetProps: NodeProps {
  @Published public var isPresented: Bool = false
  static let defaultDetents = ["medium", "large"]

  @Published public var detents: [String] = SheetProps.defaultDetents
  @Published public var title: String = ""
  @Published public var message: String = ""
  @Published public var primaryButtonTitle: String?
  @Published public var secondaryButtonTitle: String?
  // Event for dismissal
  public var onDismiss: (() -> Void)?
  public var onPrimaryAction: (() -> Void)?
  public var onSecondaryAction: (() -> Void)?

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case isPresented, detents, title, message, primaryButtonTitle, secondaryButtonTitle
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    isPresented = try container.decodeIfPresent(Bool.self, forKey: .isPresented) ?? false
    detents = try container.decodeIfPresent([String].self, forKey: .detents) ?? Self.defaultDetents
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
    message = try container.decodeIfPresent(String.self, forKey: .message) ?? ""
    primaryButtonTitle = try container.decodeIfPresent(String.self, forKey: .primaryButtonTitle)
    secondaryButtonTitle = try container.decodeIfPresent(String.self, forKey: .secondaryButtonTitle)
  }

  public init() {}

  public func merge(from other: SheetProps) {
    assign(\.isPresented, .isPresented, from: other)
    assign(\.detents, .detents, from: other)
    assign(\.title, .title, from: other)
    assign(\.message, .message, from: other)
    assign(\.primaryButtonTitle, .primaryButtonTitle, from: other)
    assign(\.secondaryButtonTitle, .secondaryButtonTitle, from: other)
  }
}

// MARK: - Node

extension SheetProps {
  static let nodeType = "Sheet"

  static func makeView(props: SheetProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(SheetView(props: props) { childrenView(children) })
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onDismiss = { emit("dismiss", nil) }
    onPrimaryAction = { emit("primaryAction", nil) }
    onSecondaryAction = { emit("secondaryAction", nil) }
  }
}
