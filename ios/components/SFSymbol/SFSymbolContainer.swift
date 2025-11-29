import SwiftUI

// MARK: - Container

@objc(SFSymbolContainer)
public class SFSymbolContainer: SwiftUIContainerView {
  private let props: SFSymbolProps

  @objc
  public init(frame _: CGRect) {
    props = SFSymbolProps()
    super.init(rootView: AnyView(EmptyView()))

    hostingController.rootView = AnyView(SFSymbolView(props: props))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    do {
      let jsonData = try JSONSerialization.data(withJSONObject: newDictionary, options: [])
      let decoder = JSONDecoder()
      let updatedProps = try decoder.decode(SFSymbolProps.self, from: jsonData)
      props.merge(from: updatedProps)
    } catch {
      print("Failed to update SFSymbolProps: \(error)")
    }
  }
}
