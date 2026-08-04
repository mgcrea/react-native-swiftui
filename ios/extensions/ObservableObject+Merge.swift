import Combine

/// Shared merge primitives for the props classes.
///
/// Every `merge(from:presentKeys:)` used to be a hand-written ladder of
/// `if presentKeys.contains("x") { x = other.x }`. Two problems with that shape:
///
/// 1. It assigns unconditionally, so a JS-originated update writing the value a
///    prop *already* holds still republishes the `@Published` property. The view's
///    `.onChange(of: props.x)` then fires and calls back into JS — a controlled
///    component sees its own write echo back as a user event.
/// 2. The field list is repeated a third time (after the property and `CodingKeys`),
///    so forgetting one is silent. That is how `Button.disabled` ended up declared,
///    rendered, exposed in TypeScript, and never decoded or merged.
///
/// Named `assign` rather than `merge` because the props classes each declare their
/// own `merge(from:presentKeys:)`, which shadows an extension method of the same
/// name at the call site.
///
/// Note these take a key path rather than an `inout` parameter. Passing a
/// `@Published` property as `inout` is call-by-value-result: Swift reads it,
/// mutates a temporary, and writes it back *unconditionally* — which would publish
/// a change even when the value is identical, defeating the entire point.
extension ObservableObject {
  /// Copies `keyPath` from `other`, but only when the key was present in the JS
  /// payload and the value actually differs.
  func assign<T: Equatable>(
    _ keyPath: ReferenceWritableKeyPath<Self, T>,
    from other: Self,
    key: String,
    presentKeys: Set<String>
  ) {
    assign(keyPath, to: other[keyPath: keyPath], key: key, presentKeys: presentKeys)
  }

  /// Same, for values that need deriving first — clamping into a range, say —
  /// where the comparison has to be against the derived value, not the raw one.
  func assign<T: Equatable>(
    _ keyPath: ReferenceWritableKeyPath<Self, T>,
    to newValue: T,
    key: String,
    presentKeys: Set<String>
  ) {
    guard presentKeys.contains(key), self[keyPath: keyPath] != newValue else {
      return
    }
    self[keyPath: keyPath] = newValue
  }
}
