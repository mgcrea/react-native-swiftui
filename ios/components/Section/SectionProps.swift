import SwiftUI

public final class SectionProps: ObservableObject, Decodable {
    @Published public var header: String
    @Published public var footer: String
    @Published public var isCollapsed: Bool

    enum CodingKeys: String, CodingKey {
        case header, footer, isCollapsed
    }

    public required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        header = try container.decodeIfPresent(String.self, forKey: .header) ?? ""
        footer = try container.decodeIfPresent(String.self, forKey: .footer) ?? ""
        isCollapsed = try container.decodeIfPresent(Bool.self, forKey: .isCollapsed) ?? false
    }

    public func merge(from other: SectionProps) {
        header = other.header
        footer = other.footer
        isCollapsed = other.isCollapsed
    }
}
