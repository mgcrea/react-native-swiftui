// FormView.swift
import SwiftUI

public struct FormView<Content: View>: View {
  @ObservedObject public var props: FormProps
  let content: () -> Content

  public init(props: FormProps, @ViewBuilder content: @escaping () -> Content) {
    self.props = props
    self.content = content
  }

  public var body: some View {
    Form { content() }
      .applyViewStyles(props.style)
      .disabled(props.disabled)
      .applyFormScrollDisabled(props)
  }
}

private extension View {
  @ViewBuilder
  func applyFormScrollDisabled(_ props: FormProps) -> some View {
    if #available(iOS 16, *) {
      self.scrollDisabled(props.scrollDisabled)
    } else {
      self
    }
  }
}
