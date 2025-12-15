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
          .applyIf(margins.top != nil) {
            $0.contentMargins(.top, margins.top!, for: .scrollContent)
          }
          .applyIf(margins.leading != nil) {
            $0.contentMargins(.leading, margins.leading!, for: .scrollContent)
          }
          .applyIf(margins.bottom != nil) {
            $0.contentMargins(.bottom, margins.bottom!, for: .scrollContent)
          }
          .applyIf(margins.trailing != nil) {
            $0.contentMargins(.trailing, margins.trailing!, for: .scrollContent)
          }
      } else {
        // Fallback for iOS 15-16 using safeAreaInset
        self
          .applyIf(margins.top != nil) {
            $0.safeAreaInset(edge: .top) {
              Color.clear.frame(height: margins.top!)
            }
          }
          .applyIf(margins.bottom != nil) {
            $0.safeAreaInset(edge: .bottom) {
              Color.clear.frame(height: margins.bottom!)
            }
          }
        // Note: leading/trailing not supported via safeAreaInset fallback
      }
    } else {
      self
    }
  }
}
