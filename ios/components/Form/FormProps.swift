// FormProps.swift
import SwiftUI

public final class FormProps: ObservableObject, Decodable {
    @Published public var style: StyleProps?

    enum CodingKeys: String, CodingKey {
        case style
    }

    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
    }

    public func merge(from other: FormProps) {
        style = other.style
    }
}
