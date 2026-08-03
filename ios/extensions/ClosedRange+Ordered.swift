import Foundation

extension ClosedRange where Bound: Comparable {
  /// Builds a range from two bounds in either order.
  ///
  /// Props arrive from JS one key at a time: `merge(from:presentKeys:)` applies
  /// `minimum` and `maximum` independently, so an update carrying only one of
  /// them can leave the pair inverted for a render pass. SwiftUI's `Slider(in:)`
  /// and `Stepper(in:)` trap on `lowerBound > upperBound`, which turns a bad
  /// prop into a crash. Ordering here keeps those views total.
  init(orderedBounds a: Bound, _ b: Bound) {
    self = a <= b ? a ... b : b ... a
  }

  /// Clamps a value into the range.
  func clamping(_ value: Bound) -> Bound {
    if value < lowerBound { return lowerBound }
    if value > upperBound { return upperBound }
    return value
  }
}
