// SectionNode.swift
struct SectionNode: SwiftUINode, Decodable {
    let id: String
    let children: [any SwiftUINode]?
    let props: SectionProps

    enum PropsCodingKeys: String, CodingKey {
        case header, footer, isCollapsed
    }

    init(id: String, props: SectionProps, children: [any SwiftUINode]? = nil) {
        self.id = id
        self.props = props
        self.children = children
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: BaseCodingKeys.self)
        self.id = try container.decode(String.self, forKey: .id)
        self.children = try container.decodeIfPresent(NodeChildren.self, forKey: .children)?.nodes
        
        let propsContainer = try container.nestedContainer(keyedBy: PropsCodingKeys.self, forKey: .props)
        let sectionProps = SectionProps()
        sectionProps.header = try propsContainer.decodeIfPresent(String.self, forKey: .header) ?? ""
        sectionProps.footer = try propsContainer.decodeIfPresent(String.self, forKey: .footer) ?? ""
        sectionProps.isCollapsed = try propsContainer.decodeIfPresent(Bool.self, forKey: .isCollapsed) ?? false
        self.props = sectionProps
    }
}
