import SwiftUI

extension View {
  func applyStyles(_ style: StyleProps?) -> some View {
    var view = AnyView(self)
    if let style = style {
      if let padding = style.padding {
        view = AnyView(view.padding(padding))
      }
      if let paddingHorizontal = style.paddingHorizontal {
        view = AnyView(view.padding(.horizontal, paddingHorizontal))
      }
      if let paddingVertical = style.paddingVertical {
        view = AnyView(view.padding(.vertical, paddingVertical))
      }
      if let bgColor = style.backgroundColor {
        view = AnyView(view.background(bgColor))
      }
      if let fgColor = style.foregroundColor ?? style.color {
        view = AnyView(view.foregroundColor(fgColor))
      }
      if let cornerRadius = style.cornerRadius ?? style.borderRadius {
        view = AnyView(view.cornerRadius(cornerRadius))
      }
      if let borderWidth = style.borderWidth {
        let borderColor = style.borderColor ?? .black
        view = AnyView(view.overlay(
          RoundedRectangle(cornerRadius: style.cornerRadius ?? style.borderRadius ?? 0)
            .stroke(borderColor, lineWidth: borderWidth)
        ))
      }
      // TextStyle
      if let fontWeight = style.fontWeight {
        if #available(iOS 16.0, *) {
          view = AnyView(view.fontWeight(fontWeight))
        }
      }
      if let fontSize = style.fontSize {
        view = AnyView(view.font(.system(size: fontSize)))
      }
      if let font = style.font {
        view = AnyView(view.font(font))
      }
    }
    return view
  }
}
