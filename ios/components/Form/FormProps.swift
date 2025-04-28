// FormProps.swift
import SwiftUI

public final class FormProps: ObservableObject, Decodable {
    @Published public var style: StyleProps?
    @Published var disabled: Bool = false
    @Published var scrollDisabled: Bool = false

    enum CodingKeys: String, CodingKey {
        case style
        case disabled
        case scrollDisabled
    }

    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
        disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
        scrollDisabled = try container.decodeIfPresent(Bool.self, forKey: .scrollDisabled) ?? false
    }

    public func merge(from other: FormProps) {
        style = other.style
        disabled = other.disabled
        scrollDisabled = other.scrollDisabled
    }
}
