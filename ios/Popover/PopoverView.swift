import SwiftUI
import UIKit

// MARK: - Props

final class PopoverProps: ObservableObject {
  @Published var selection: String = ""
  @Published var options: [String] = []

  func update(with newDictionary: [String: Any]) {
    selection = newDictionary["selection"] as? String ?? ""
    options = newDictionary["options"] as? [String] ?? []
  }
}

// MARK: - Component

public struct SwiftUIPopover: View {
  @State private var showPopover = false
  @ObservedObject var props: PopoverProps

  public var body: some View {
    Button(action: { showPopover.toggle() }) {
      HStack {
        Text(props.selection)
        Image(systemName: "chevron.down")
      }
      .padding()
      .background(RoundedRectangle(cornerRadius: 8).fill(Color.blue))
      .foregroundColor(.white)
    }
    .popover(isPresented: $showPopover, arrowEdge: .bottom) {
      VStack(alignment: .leading, spacing: 0) {
        ForEach(props.options, id: \.self) { option in
          Button(action: {
            props.selection = option
            showPopover = false
          }) {
            Text(option)
              .padding()
              .frame(maxWidth: .infinity, alignment: .leading)
          }
          Divider()
        }
      }
      .background(.ultraThinMaterial) // Applies the blurred transparency
      .cornerRadius(12)
      .padding()
      .frame(width: 200)
    }
  }
}

// MARK: - Container

@objc(PopoverView)
public class PopoverView: SwiftUIContainerView {
  private let props: PopoverProps

  @objc
  public init(frame _: CGRect) {
    props = PopoverProps()
    super.init(rootView: AnyView(SwiftUIPopover(props: props)))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }
}
