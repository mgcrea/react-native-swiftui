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
      if let fgColor = style.foregroundColor {
        view = AnyView(view.foregroundColor(fgColor))
      }
    }
    return view
  }
}
