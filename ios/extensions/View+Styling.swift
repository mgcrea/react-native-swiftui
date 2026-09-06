import SwiftUI

// MARK: - Entry points

extension View {
  /// Applies every box, colour and text style in `style`. `nil` adds nothing.
  ///
  /// This used to be a chain of four functions, each returning `AnyView`, so
  /// every styled view sat behind four type erasures. `AnyView` hides a view's
  /// structure from SwiftUI's diffing, which then rebuilds the subtree on any
  /// change. A `ViewModifier` keeps the structure visible. Each style key is
  /// still applied conditionally: a `Section` inside a `Form` stops being a
  /// section once a layout modifier wraps it, so an unconditional `.padding(0)`
  /// is not a no-op there.
  func applyStyles(_ style: StyleProps?) -> some View {
    modifier(StyleModifier(style: style))
  }

  /// Applies `transform` when `value` is non-nil. The previous form,
  /// `applyIf(x != nil) { $0.foo(x!) }`, force-unwrapped at every call site.
  @ViewBuilder
  func applyIfLet<T, V: View>(_ value: T?, transform: (Self, T) -> V) -> some View {
    if let value {
      transform(self, value)
    } else {
      self
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
    applyIfLet(style?.backgroundColor) { shape, color in shape.fill(Color(value: color)) }
      .modifier(BoxModifier(style: style))
  }
}

// MARK: - Modifiers

/// Frame, position and padding.
private struct BoxModifier: ViewModifier {
  let style: StyleProps?

  func body(content: Content) -> some View {
    content
      .modifier(FrameModifier(style: style))
      .modifier(AbsolutePositionModifier(style: style))
      .applyIfLet(style?.padding) { view, value in view.padding(value) }
      .applyIfLet(style?.paddingHorizontal) { view, value in view.padding(.horizontal, value) }
      .applyIfLet(style?.paddingVertical) { view, value in view.padding(.vertical, value) }
      .applyIfLet(style?.paddingLeft) { view, value in view.padding(.leading, value) }
      .applyIfLet(style?.paddingRight) { view, value in view.padding(.trailing, value) }
      .applyIfLet(style?.paddingTop) { view, value in view.padding(.top, value) }
      .applyIfLet(style?.paddingBottom) { view, value in view.padding(.bottom, value) }
  }
}

private struct StyleModifier: ViewModifier {
  let style: StyleProps?

  func body(content: Content) -> some View {
    content
      .modifier(BoxModifier(style: style))
      .applyIfLet(style?.backgroundColor) { view, color in view.background(Color(value: color)) }
      // `color` is an alias for `foregroundColor`. Applied once, as
      // `foregroundStyle` only: applying it again in the text pass also set
      // `.tint`, so `color: 'red'` silently recoloured the control tint.
      .applyIfLet(style?.color ?? style?.foregroundColor) { view, color in view.foregroundStyle(Color(value: color)) }
      .applyIfLet(style?.accentColor) { view, color in view.accentColor(Color(value: color)) }
      .applyIfLet(style?.tint ?? style?.tintColor) { view, color in view.tint(Color(value: color)) }
      .applyIfLet(style?.preferredColorScheme) { view, scheme in view.preferredColorScheme(scheme) }
      .applyIfLet(style?.borderWidth) { view, width in
        view.overlay(
          RoundedRectangle(cornerRadius: style?.cornerRadius ?? style?.borderRadius ?? 0)
            .stroke(style?.borderColor.map { Color(value: $0) } ?? .black, lineWidth: width)
        )
      }
      .applyIfLet(style?.cornerRadius ?? style?.borderRadius) { view, radius in view.cornerRadius(radius) }
      .modifier(TextStyleModifier(style: style))
  }
}

/// Font precedence is spelled out rather than left to SwiftUI's
/// innermost-modifier-wins ordering. The chained form applied `.font` up to
/// three times and the winner depended on nesting order, so `font` plus
/// `fontFamily` silently dropped `fontFamily`.
private struct TextStyleModifier: ViewModifier {
  let style: StyleProps?

  func body(content: Content) -> some View {
    font(content)
      .modifier(FontWeightModifier(weight: style?.fontWeight))
      .applyIfLet(style?.textAlign) { view, alignment in view.multilineTextAlignment(alignment) }
  }

  @ViewBuilder
  private func font(_ content: Content) -> some View {
    if let font = style?.font {
      content.font(font)
    } else if let family = style?.fontFamily {
      content.font(.custom(family, size: style?.fontSize ?? 17))
    } else if let size = style?.fontSize {
      content.font(.system(size: size))
    } else {
      content
    }
  }
}

private struct FontWeightModifier: ViewModifier {
  let weight: Font.Weight?

  func body(content: Content) -> some View {
    if #available(iOS 16.0, *), let weight {
      content.fontWeight(weight)
    } else {
      content
    }
  }
}

private struct FrameModifier: ViewModifier {
  let style: StyleProps?

  func body(content: Content) -> some View {
    if let style, style.needsGeometry {
      GeometryReader { geometry in
        content.frame(
          minWidth: style.minWidth?.calculate(from: geometry.size.width),
          idealWidth: style.width?.calculate(from: geometry.size.width),
          maxWidth: style.maxWidth?.calculate(from: geometry.size.width),
          minHeight: style.minHeight?.calculate(from: geometry.size.height),
          idealHeight: style.height?.calculate(from: geometry.size.height),
          maxHeight: style.maxHeight?.calculate(from: geometry.size.height)
        )
      }
    } else if let style {
      let params = computeFrameParameters(from: style)
      if params.hasBounds {
        content.frame(
          minWidth: params.minWidth,
          idealWidth: params.width,
          maxWidth: params.maxWidth,
          minHeight: params.minHeight,
          idealHeight: params.height,
          maxHeight: params.maxHeight
        )
      } else {
        // Fixed, not ideal: `.frame(width:)` pins the size, `idealWidth:` only
        // proposes it.
        content.frame(width: params.width, height: params.height)
      }
    } else {
      content
    }
  }
}

private extension StyleProps {
  /// A percentage other than 100% needs the parent's size to resolve.
  var needsGeometry: Bool {
    isFractional(width) || isFractional(minWidth) || isFractional(maxWidth)
      || isFractional(height) || isFractional(minHeight) || isFractional(maxHeight)
  }

  private func isFractional(_ size: Size?) -> Bool {
    if case let .percentage(fraction) = size {
      return fraction != 1.0
    }
    return false
  }
}

struct AbsolutePositionModifier: ViewModifier {
  let style: StyleProps?

  func body(content: Content) -> some View {
    if let style, style.position == "absolute" {
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
