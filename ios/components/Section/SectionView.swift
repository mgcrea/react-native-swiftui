// SectionView.swift
import SwiftUI

public struct SectionView<Content: View>: View {
  @ObservedObject public var props: SectionProps
  let content: () -> Content

  public init(props: SectionProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    Section(
      header: props.header.isEmpty ? nil : Text(props.header),
      footer: props.footer.isEmpty ? nil : Text(props.footer)
    ) {
      if !props.isCollapsed {
        content()
      } else {
        EmptyView() // Hide content when collapsed
      }
    }
    .applyViewStyles(props.style)
  }
}
