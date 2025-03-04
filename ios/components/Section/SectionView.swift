// SectionView.swift
import SwiftUI

public struct SectionView: View {
    @ObservedObject public var props: SectionProps
    let content: AnyView // Children from ContainerView

    public init(props: SectionProps, content: AnyView) {
        self.props = props
        self.content = content
    }

    public var body: some View {
        Section(
            header: props.header.isEmpty ? nil : Text(props.header),
            footer: props.footer.isEmpty ? nil : Text(props.footer)
        ) {
            if !props.isCollapsed {
                content
            } else {
                EmptyView() // Hide content when collapsed
            }
        }
    }
}
