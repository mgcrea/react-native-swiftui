import Combine
import SwiftUI

@objc(SwiftUIRootView)
public class SwiftUIRootView: SwiftUIContainerView {
  @ObservedObject private var props: SwiftUIRootProps
  private var cancellables: Set<AnyCancellable> = []
  @objc public var onEvent: ((NSString, NSString, NSString, NSString?) -> Void)?

  @objc public init(frame _: CGRect) {
    props = SwiftUIRootProps()
    super.init(rootView: AnyView(EmptyView()))

    props.onEvent = { [weak self] name, type, id, value in
      self?.onEvent?(name as NSString, type as NSString, id as NSString, value as NSString?)
    }

    props.$viewTree
      .receive(on: DispatchQueue.main)
      .sink { [weak self] node in
        self?.updateSwiftUIView(with: node)
      }
      .store(in: &cancellables)
  }

  @objc public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]?) {
    DispatchQueue.main.async { [weak self] in
      self?.props.update(with: newDictionary)
    }
  }

  private func updateSwiftUIView(with node: (any SwiftUINode)?) {
    // `node.makeView()` reads nothing but the node, so no `self` is captured by
    // the view tree stored in `hostingController` — which `self` owns. Doing
    // this through an instance method once leaked the entire root per mount.
    hostingController.rootView = node?.makeView() ?? AnyView(Text("Invalid view tree"))
  }

  /// One decoder for every update: it was allocated per keystroke, alongside a
  /// second `JSONSerialization` parse of the same bytes just to list the keys.
  private static let decoder = JSONDecoder()

  @objc public func updateChildProps(_ identifier: String, props propsJson: String) {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }
      guard let node = self.props.nodeIndex[identifier] else {
        print("Node with id \(identifier) not found")
        return
      }
      guard let updatedPropsData = propsJson.data(using: .utf8) else {
        print("Failed to encode props for \(identifier)")
        return
      }
      do {
        try node.merge(json: updatedPropsData, using: Self.decoder)
      } catch {
        print("Failed to decode props for \(identifier): \(error)")
      }
    }
  }

  @objc public func tearDown() {
    // Must come first: dropping the tree below republishes `viewTree`, and a
    // live subscription would rebuild the very views this is tearing down.
    cancellables.removeAll()
    onEvent = nil
    // Drops the decoded node tree, the id index and any closures the built views
    // hold. Without this, the rendered tree stays alive for as long as the
    // hosting controller does, even once React has dropped the view.
    props.tearDown()
    hostingController.rootView = AnyView(EmptyView())
  }

  deinit {
    cancellables.removeAll()
  }
}
