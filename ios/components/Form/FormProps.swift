// FormProps.swift
import SwiftUI

public struct ContentMargins: Decodable {
    public var top: CGFloat?
    public var leading: CGFloat?
    public var bottom: CGFloat?
    public var trailing: CGFloat?
}

public final class FormProps: ObservableObject, Decodable {
    @Published public var style: StyleProps?
    @Published var disabled: Bool = false
    @Published var scrollDisabled: Bool = false
    @Published var contentMargins: ContentMargins?

    enum CodingKeys: String, CodingKey {
        case style
        case disabled
        case scrollDisabled
        case contentMargins
    }

    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
        disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
        scrollDisabled = try container.decodeIfPresent(Bool.self, forKey: .scrollDisabled) ?? false
        contentMargins = try container.decodeIfPresent(ContentMargins.self, forKey: .contentMargins)
    }

    public func merge(from other: FormProps, presentKeys: Set<String>) {
        if presentKeys.contains("style") {
            style = other.style
        }
        if presentKeys.contains("disabled") {
            disabled = other.disabled
        }
        if presentKeys.contains("scrollDisabled") {
            scrollDisabled = other.scrollDisabled
        }
        if presentKeys.contains("contentMargins") {
            contentMargins = other.contentMargins
        }
    }
}
