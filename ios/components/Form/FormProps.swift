// FormProps.swift
import SwiftUI

public struct ContentMargins: Decodable, Equatable {
    public var top: CGFloat?
    public var leading: CGFloat?
    public var bottom: CGFloat?
    public var trailing: CGFloat?
}

public final class FormProps: NodeProps {
    @Published public var style: StyleProps?
    @Published var disabled: Bool = false
    @Published var scrollDisabled: Bool = false
    @Published var contentMargins: ContentMargins?

    /// Keys that were in the payload this object was decoded from. See `NodeProps`.
    private(set) var presentKeys: Set<String> = []

    enum CodingKeys: String, CodingKey {
        case style
        case disabled
        case scrollDisabled
        case contentMargins
    }

    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        presentKeys = container.presentKeys
        style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
        disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
        scrollDisabled = try container.decodeIfPresent(Bool.self, forKey: .scrollDisabled) ?? false
        contentMargins = try container.decodeIfPresent(ContentMargins.self, forKey: .contentMargins)
    }

    public func merge(from other: FormProps) {
        assign(\.style, .style, from: other)
        assign(\.disabled, .disabled, from: other)
        assign(\.scrollDisabled, .scrollDisabled, from: other)
        assign(\.contentMargins, .contentMargins, from: other)
    }
}

// MARK: - Node

extension FormProps {
  static let nodeType = "Form"

  static func makeView(props: FormProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(FormView(props: props) { childrenView(children) })
  }
}
