import SwiftUI

final class SwiftUIRootProps: ObservableObject {
  @Published private(set) var viewTree: (any SwiftUINode)?
  /// `id` -> node, so `updateChildProps` can look a node up directly. It sits on
  /// the path of every keystroke, and used to walk the whole tree per update.
  /// Built on the same recursion that binds the event handlers, so it costs no
  /// extra traversal, and holds nodes already retained by `viewTree`.
  private(set) var nodeIndex: [String: any SwiftUINode] = [:]
  public var onEvent: ((String, String, String, String?) -> Void)?

  func update(with newDictionary: [String: Any]) {
    if let jsonString = newDictionary["viewTree"] as? String {
      do {
        // Reconcile against the previous tree by id: a node that already exists
        // keeps its props object (with the new values merged in), so SwiftUI
        // sees the same `@ObservedObject` and keeps `@State`/`@FocusState`.
        // Rebuilding from scratch dismissed the keyboard whenever a sibling
        // mounted. Wired up before publishing, so nothing can observe a tree
        // whose handlers are not yet attached.
        let decoded = try decodeSwiftUINode(from: jsonString)
        let previousIndex = nodeIndex
        nodeIndex = [:]
        let reconciled = reconcile(decoded, against: previousIndex)
        indexAndBindEvents(from: reconciled)
        viewTree = reconciled
      } catch {
        print("Failed to decode view tree: \(error)")
        nodeIndex = [:]
        viewTree = nil
      }
    }
  }

  func tearDown() {
    onEvent = nil
    nodeIndex = [:]
    viewTree = nil
  }

  private func reconcile(_ node: any SwiftUINode, against previous: [String: any SwiftUINode]) -> any SwiftUINode {
    let children = node.children?.map { reconcile($0, against: previous) }
    return node.adopting(previous: previous[node.id], children: children)
  }

  /// One walk, two jobs: record every node by id and attach its event closures.
  private func indexAndBindEvents(from node: (any SwiftUINode)?) {
    guard let node = node else { return }
    nodeIndex[node.id] = node
    node.bindEvents { [weak self] name, type, id, value in
      self?.onEvent?(name, type, id, value)
    }
    node.children?.forEach { indexAndBindEvents(from: $0) }
  }
}
