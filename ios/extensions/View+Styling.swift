import SwiftUI

extension View {
  func applyStyles(_ style: StyleProps?) -> some View {
    var view = AnyView(self)
    if let style = style {
      if let padding = style.padding {
        view = AnyView(view.padding(padding))
      }
      if let bgColor = style.backgroundColor {
        view = AnyView(view.background(bgColor))
      }
      if let fgColor = style.foregroundColor ?? style.color {
        view = AnyView(view.foregroundColor(fgColor))
      }
      if let cornerRadius = style.cornerRadius {
        view = AnyView(view.cornerRadius(cornerRadius))
      }
      if let borderWidth = style.borderWidth {
        let borderColor = style.borderColor ?? .black
        view = AnyView(view.overlay(
          RoundedRectangle(cornerRadius: style.cornerRadius ?? 0)
            .stroke(borderColor, lineWidth: borderWidth)
        ))
      }
      // TextStyle
      if let fontWeight = style.fontWeight {
        if #available(iOS 16.0, *)  {
          view = AnyView(view.fontWeight(fontWeight))
        }
      }
      if let fontSize = style.fontSize {
        view = AnyView(view.font(.system(size: fontSize)))
      }
    }
    return view
  }
}
