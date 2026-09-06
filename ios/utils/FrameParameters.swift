import SwiftUI

struct FrameParameters {
  var width: CGFloat? = nil
  var minWidth: CGFloat? = nil
  var maxWidth: CGFloat? = nil
  var height: CGFloat? = nil
  var minHeight: CGFloat? = nil
  var maxHeight: CGFloat? = nil

  var hasBounds: Bool {
    minWidth != nil || maxWidth != nil || minHeight != nil || maxHeight != nil
  }
}

/// Resolves a size that needs no parent measurement: a finite value as is, and
/// `100%` as `.infinity`. Any other percentage is left for the `GeometryReader`
/// path. This was six copies of the same `switch`, one per key path.
private func resolve(_ size: Size?) -> CGFloat? {
  switch size {
  case let .finite(value):
    return value
  case let .percentage(fraction):
    return fraction == 1.0 ? .infinity : nil
  case nil:
    return nil
  }
}

func computeFrameParameters(from style: StyleProps) -> FrameParameters {
  FrameParameters(
    width: resolve(style.width),
    minWidth: resolve(style.minWidth),
    maxWidth: resolve(style.maxWidth),
    height: resolve(style.height),
    minHeight: resolve(style.minHeight),
    maxHeight: resolve(style.maxHeight)
  )
}
