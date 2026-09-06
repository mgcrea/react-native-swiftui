import Combine
import SwiftUI

/// What every tree node's props class conforms to.
///
/// `presentKeys` is the set of keys that were in the JSON payload this object was
/// decoded from. `merge(from:)` copies only those keys — so a JS update carrying
/// `{ "text": "x" }` leaves every other property alone, and one carrying
/// `{ "maxLength": null }` clears it. It used to be computed by a second
/// `JSONSerialization` pass over the same bytes in `updateChildProps`; the
/// decoder's `allKeys` has it for free.
///
/// `CodingKeys` is the class's own nested enum, inferred automatically. It lets
/// `assign` take the key as a typed case, so a mismatch between the key path and
/// the key is a compile error instead of a prop that silently stops updating.
protocol NodeProps: ObservableObject, Decodable {
  associatedtype CodingKeys: CodingKey

  /// The `type` string JS puts on the node, e.g. `"TextField"`.
  static var nodeType: String { get }
  var presentKeys: Set<String> { get }
  func merge(from other: Self)

  /// Wires this object's event closures to `emit(eventName, value)`. The node
  /// type and id are added by the caller. Default: nothing to wire.
  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void)
  /// Builds the SwiftUI view for a node holding these props.
  static func makeView(props: Self, children: [any SwiftUINode]?) -> AnyView
}

extension NodeProps {
  func bindEvents(emit _: @escaping (_ name: String, _ value: String?) -> Void) {}

  static func makeNode(from decoder: Decoder) throws -> any SwiftUINode {
    try GenericNode<Self>(from: decoder)
  }
}

/// Shared merge primitives for the props classes.
///
/// Every `merge(from:)` used to be a hand-written ladder of
/// `if presentKeys.contains("x") { x = other.x }`. Two problems with that shape:
///
/// 1. It assigns unconditionally, so a JS-originated update writing the value a
///    prop *already* holds still republishes the `@Published` property. The view's
///    `.onChange(of: props.x)` then fires and calls back into JS — a controlled
///    component sees its own write echo back as a user event.
/// 2. The key was a string literal matched at runtime, so a typo compiled fine
///    and the prop was simply never merged again.
///
/// Note these take a key path rather than an `inout` parameter. Passing a
/// `@Published` property as `inout` is call-by-value-result: Swift reads it,
/// mutates a temporary, and writes it back *unconditionally* — which would publish
/// a change even when the value is identical, defeating the entire point.
extension NodeProps {
  /// True when `key` was in the payload this object was decoded from.
  func isPresent(_ key: CodingKeys) -> Bool {
    presentKeys.contains(key.stringValue)
  }

  /// Copies `keyPath` from `other`, but only when the key was present in the JS
  /// payload and the value actually differs.
  func assign<T: Equatable>(_ keyPath: ReferenceWritableKeyPath<Self, T>, _ key: CodingKeys, from other: Self) {
    assign(keyPath, key, to: other[keyPath: keyPath], from: other)
  }

  /// Same, for values that need deriving first — clamping into a range, say —
  /// where the comparison has to be against the derived value, not the raw one.
  func assign<T: Equatable>(
    _ keyPath: ReferenceWritableKeyPath<Self, T>,
    _ key: CodingKeys,
    to newValue: T,
    from other: Self
  ) {
    guard other.isPresent(key), self[keyPath: keyPath] != newValue else {
      return
    }
    self[keyPath: keyPath] = newValue
  }
}

extension KeyedDecodingContainer {
  /// Every key in the payload, including those whose value is `null`.
  var presentKeys: Set<String> {
    Set(allKeys.map(\.stringValue))
  }
}
