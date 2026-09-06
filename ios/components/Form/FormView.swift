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
      .applyStyles(props.style)
      .disabled(props.disabled)
      .applyFormScrollDisabled(props)
      .applyFormContentMargins(props)
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

  @ViewBuilder
  func applyFormContentMargins(_ props: FormProps) -> some View {
    if let margins = props.contentMargins {
      if #available(iOS 17, *) {
        self
          .applyIfLet(margins.top) { view, value in view.contentMargins(.top, value, for: .scrollContent) }
          .applyIfLet(margins.leading) { view, value in view.contentMargins(.leading, value, for: .scrollContent) }
          .applyIfLet(margins.bottom) { view, value in view.contentMargins(.bottom, value, for: .scrollContent) }
          .applyIfLet(margins.trailing) { view, value in view.contentMargins(.trailing, value, for: .scrollContent) }
      } else {
        // Fallback for iOS 15-16 using safeAreaInset
        self
          .applyIfLet(margins.top) { view, value in
            view.safeAreaInset(edge: .top) { Color.clear.frame(height: value) }
          }
          .applyIfLet(margins.bottom) { view, value in
            view.safeAreaInset(edge: .bottom) { Color.clear.frame(height: value) }
          }
        // Note: leading/trailing not supported via safeAreaInset fallback
      }
    } else {
      self
    }
  }
}
