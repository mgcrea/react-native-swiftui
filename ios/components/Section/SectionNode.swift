// SectionNode.swift
struct SectionNode: SwiftUINode, Decodable {
    let id: String
    let children: [any SwiftUINode]?
    let props: SectionProps

    enum CodingKeys: String, CodingKey {
        case id, props, children
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes
        props = try container.decode(SectionProps.self, forKey: .props)
    }
}
