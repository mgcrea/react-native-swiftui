import SwiftUI

extension View {
  func applyStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }
    return AnyView(
      applyViewStyles(style)
        .applyTextStyles(style)
    )
  }

  func applyFrameStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }

    let needsGeometry = [style.width, style.minWidth, style.maxWidth, style.height, style.minHeight, style.maxHeight].contains { size in
      if case let .percentage(fraction) = size {
        return fraction != 1.0
      }
      return false
    }

    if needsGeometry {
      return AnyView(
        GeometryReader { geometry in
          let width = style.width?.calculate(from: geometry.size.width)
          let minWidth = style.minWidth?.calculate(from: geometry.size.width)
          let maxWidth = style.maxWidth?.calculate(from: geometry.size.width)
          let height = style.height?.calculate(from: geometry.size.height)
          let minHeight = style.minHeight?.calculate(from: geometry.size.height)
          let maxHeight = style.maxHeight?.calculate(from: geometry.size.height)

          self.frame(
            minWidth: minWidth,
            idealWidth: width,
            maxWidth: maxWidth,
            minHeight: minHeight,
            idealHeight: height,
            maxHeight: maxHeight
          )
        }
      )
    } else {
      let params = computeFrameParameters(from: style)

      if params.maxHeight == nil && params.maxWidth == nil && params.minWidth == nil && params.minHeight == nil {
        return AnyView(frame(width: params.width, height: params.height))
      }

      return AnyView(
        frame(
          minWidth: params.minWidth,
          idealWidth: params.width,
          maxWidth: params.maxWidth,
          minHeight: params.minHeight,
          idealHeight: params.height,
          maxHeight: params.maxHeight
        )
      )
    }
  }

  func applyBoxStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }

    return AnyView(AnyView(applyFrameStyles(style)
        .modifier(AbsolutePositionModifier(style: style))
        .applyIf(style.padding != nil) { $0.padding(style.padding!) }
        .applyIf(style.paddingHorizontal != nil) { $0.padding(.horizontal, style.paddingHorizontal!) }
        .applyIf(style.paddingVertical != nil) { $0.padding(.vertical, style.paddingVertical!) })
      .applyIf(style.paddingLeft != nil) { $0.padding(.leading, style.paddingLeft!) }
      .applyIf(style.paddingRight != nil) { $0.padding(.trailing, style.paddingRight!) }
      .applyIf(style.paddingTop != nil) { $0.padding(.top, style.paddingTop!) }
      .applyIf(style.paddingBottom != nil) { $0.padding(.bottom, style.paddingBottom!) })
  }

  func applyViewStyles(_ style: StyleProps?) -> some View {
    guard let style = style else { return AnyView(self) }
    return
      AnyView(
        applyBoxStyles(style)
          .applyIf(style.backgroundColor != nil) { $0.background(Color(value: style.backgroundColor!)) }
          .applyIf(style.color != nil || style.foregroundColor != nil) { $0.foregroundStyle(Color(value: style.color ?? style.foregroundColor!)) }
          .applyIf(style.accentColor != nil) { $0.accentColor(Color(value: style.accentColor!)) }
          .applyIf(style.tint != nil || style.tintColor != nil) {
            $0.tint(Color(value: style.tint ?? style.tintColor!))
          }
          .applyIf(style.preferredColorScheme != nil) { $0.preferredColorScheme(style.preferredColorScheme!) }
          .applyIf(style.borderWidth != nil) { view in
            view.overlay(
              RoundedRectangle(cornerRadius: style.cornerRadius ?? style.borderRadius ?? 0)
                .stroke(style.borderColor != nil ? Color(value: style.borderColor!) : .black, lineWidth: style.borderWidth!)
            )
          }
          .applyIf(style.cornerRadius ?? style.borderRadius != nil) {
            $0.cornerRadius(style.cornerRadius ?? style.borderRadius ?? 0)
          }
      )
  }

  private func applyTextStyles(_ style: StyleProps) -> some View {
    return applyIf(style.color != nil) { $0.foregroundStyle(Color(value: style.color!)).tint(Color(value: style.color!)) }
      .applyIf(style.font != nil) { $0.font(style.font!) }
      .applyIf(style.fontFamily != nil) { $0.font(.custom(style.fontFamily!, size: style.fontSize ?? 17)) }
      .applyIf(style.fontFamily == nil && style.fontSize != nil) { $0.font(.system(size: style.fontSize!)) }
      .applyIf(style.fontWeight != nil) { view in
        if #available(iOS 16.0, *) {
          return AnyView(view.fontWeight(style.fontWeight!))
        } else {
          return AnyView(view)
        }
      }
      .applyIf(style.textAlign != nil) {
        $0.multilineTextAlignment(style.textAlign!)
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
      applyIf(style.backgroundColor != nil) { $0.fill(Color(value: style.backgroundColor!)) }
        .applyBoxStyles(style))
  }
}

struct AbsolutePositionModifier: ViewModifier {
  let style: StyleProps
  func body(content: Content) -> some View {
    if style.position == "absolute" {
      // Use .position() for absolute positioning relative to parent
      content.position(
        x: (style.left ?? 0) + (style.right != nil ? UIScreen.main.bounds.width - (style.right ?? 0) : 0),
        y: (style.top ?? 0) + (style.bottom != nil ? UIScreen.main.bounds.height - (style.bottom ?? 0) : 0)
      )
    } else {
      content // Default to relative positioning
    }
  }
}
