import SwiftUI

extension View {
  func applyStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }
    return AnyView(
      applyViewStyles(style)
        .applyTextStyles(style)
    )
  }

  func applyBoxStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }
    return AnyView(applyIf(style.width != nil || style.height != nil) { $0.frame(width: style.width, height: style.height) }
      .applyIf(style.padding != nil) { $0.padding(style.padding!) }
      .applyIf(style.paddingHorizontal != nil) { $0.padding(.horizontal, style.paddingHorizontal!) }
      .applyIf(style.paddingVertical != nil) { $0.padding(.horizontal, style.paddingVertical!) }
    )
  }

  func applyViewStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }
    return
      AnyView(
        applyIf(style.backgroundColor != nil) { $0.background(style.backgroundColor!) }
          .applyIf(style.borderWidth != nil) { view in
            view.overlay(
              RoundedRectangle(cornerRadius: style.cornerRadius ?? style.borderRadius ?? 0)
                .stroke(style.borderColor ?? .black, lineWidth: style.borderWidth!)
            )
          }
          .applyBoxStyles(style)
      )
  }

  private func applyTextStyles(_ style: StyleProps) -> some View {
    return applyIf(style.color != nil) { $0.foregroundStyle(style.color!) }
    .applyIf(style.font != nil) { $0.font(style.font!) }
    .applyIf(style.fontSize != nil) { $0.font(.system(size: style.fontSize!)) }
    .applyIf(style.fontWeight != nil) { view in
      if #available(iOS 16.0, *) {
        return AnyView(view.fontWeight(style.fontWeight!))
      } else {
        return AnyView(view)
      }
    }
  }

  @ViewBuilder
  func applyIf<T: View>(_ condition: Bool, apply: (Self) -> T) -> some View {
    if condition {
      apply(self)
    } else {
      self
    }
  }
}

extension Shape {
  func applyShapeStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }
    return AnyView(
      applyIf(style.backgroundColor != nil) { $0.fill(style.backgroundColor!) }
        .applyBoxStyles(style))
  }
}
