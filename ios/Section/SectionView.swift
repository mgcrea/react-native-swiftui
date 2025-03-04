import SwiftUI
import UIKit


// MARK: - Props

final class SectionProps: ObservableObject {
  @Published var header: String = ""
  @Published var footer: String = ""
  @Published var listStyle: String = "inset" // "inset", "insetGrouped", "plain", "grouped"

  func update(with newDictionary: [String: Any]) {
    header = newDictionary["header"] as? String ?? ""
    footer = newDictionary["footer"] as? String ?? ""
    listStyle = newDictionary["listStyle"] as? String ?? "inset"
  }
}

// MARK: - Component

public struct SwiftUISection: View {
  @ObservedObject var props: SectionProps
  @State var children: [UIView] = []

  private func getListStyle() -> any ListStyle {
    switch props.listStyle {
    case "inset":
      return InsetListStyle()
    case "insetGrouped":
      return InsetGroupedListStyle()
    case "plain":
      return PlainListStyle()
    case "grouped":
      return GroupedListStyle()
    default:
      return InsetListStyle()
    }
  }

  public var body: some View {
    @State var selection = "Option 1"
    @State var options = ["Option 1", "Option 2", "Option 3"]

    let baseList = List {
      Section(
        header: Text(props.header).textCase(.none),
        footer: Text(props.footer).textCase(.none)
      ) {
        Picker("Select", selection: $selection) {
          ForEach(options, id: \.self) { option in
            Text(option).tag(option)
          }
        }
        // ForEach(0 ..< children.count, id: \.self) { index in
        //   ChildView(view: children[index])
        // }
      }
    }
    .listStyle(getListStyle())
    .environment(\.defaultMinListRowHeight, 10) // Allow for smaller rows

    // Apply the appropriate list style
    switch props.listStyle {
    case "inset":
      return AnyView(baseList.listStyle(InsetListStyle()))
    case "insetGrouped":
      return AnyView(baseList.listStyle(InsetGroupedListStyle()))
    case "plain":
      return AnyView(baseList.listStyle(PlainListStyle()))
    case "grouped":
      return AnyView(baseList.listStyle(GroupedListStyle()))
    default:
      return AnyView(baseList.listStyle(InsetListStyle()))
    }
  }

  // Method to update children views
  mutating func updateChildren(_ newChildren: [UIView]) {
    children = newChildren
  }
}

// Helper view to wrap UIView in SwiftUI
struct ChildView: UIViewRepresentable {
  let view: UIView

  func makeUIView(context _: Context) -> UIView {
    return view
  }

  func updateUIView(_: UIView, context _: Context) {
    // Nothing needed here since we're just wrapping an existing view
  }
}

// MARK: - Container

@objc(SectionView)
public class SectionView: SwiftUIContainerView {
  private let props: SectionProps
  private var swiftUISection: SwiftUISection
  private var childViews: [UIView] = []

  @objc
  public init(frame _: CGRect) {
    props = SectionProps()
    swiftUISection = SwiftUISection(props: props)
    super.init(rootView: AnyView(swiftUISection))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }

  @objc
  public func mountChildComponentView(_: UIView, _: Int) {
    // swiftUISection.children.insert(view, at: index)
  }

  @objc
  public func unmountChildComponentView(_ view: UIView) {
    if let index = swiftUISection.children.firstIndex(where: { $0 === view }) {
      swiftUISection.children.remove(at: index)
    }
  }
}
