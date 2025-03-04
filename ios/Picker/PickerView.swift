import Combine
import SwiftUI
import UIKit

// MARK: - Props

public final class PickerProps: ObservableObject {
  @Published var selection: String = ""
  @Published var label: String = ""
  @Published var options: [String] = []
  @Published var pickerStyle: PickerStyle = .wheel
  public var onChange: ((String) -> Void)?

  enum PickerStyle: String, CaseIterable {
    case menu
    case segmented
    case wheel
    case inline

    @ViewBuilder
    func applyStyle<V: View>(_ view: V) -> some View {
      switch self {
      case .menu:
        view.pickerStyle(MenuPickerStyle())
      case .segmented:
        view.pickerStyle(SegmentedPickerStyle())
      case .wheel:
        view.pickerStyle(WheelPickerStyle())
      case .inline:
        view.pickerStyle(InlinePickerStyle())
      }
    }
  }

  func update(with newDictionary: [String: Any]) {
    label = newDictionary["label"] as? String ?? ""
    selection = newDictionary["selection"] as? String ?? ""
    options = newDictionary["options"] as? [String] ?? []
    if let styleString = newDictionary["pickerStyle"] as? String,
       let style = PickerStyle(rawValue: styleString)
    {
      pickerStyle = style
    } else {
      pickerStyle = .wheel // Default fallback
    }
  }
}

// MARK: - View

public struct PickerView: View {
  @ObservedObject var props: PickerProps

  public init(props: PickerProps, onSelectionChanged _: ((String) -> Void)? = nil) {
    self.props = props
  }

  public var body: some View {
    props.pickerStyle.applyStyle(
      Picker(props.label, selection: $props.selection) {
        ForEach(props.options, id: \.self) { option in
          Text(option).tag(option)
        }
      }.onChange(of: props.selection) { newValue in
        print("Value changed! \(newValue)")
        props.onChange?(newValue)
      }
    )
  }
  
}

// MARK: - Container

@objc(PickerContainerView)
public class PickerContainerView: SwiftUIContainerView {
  private let props: PickerProps
  private var cancellables: Set<AnyCancellable> = []
  @objc public var onChange: ((NSString) -> Void)?

  @objc
  public init(frame _: CGRect) {
    props = PickerProps()
    super.init(rootView: AnyView(EmptyView())) // Temporary rootView

    props.onChange = { [weak self] newValue in
      self?.onChange?(newValue as NSString)
    }
    // Set the real rootView after super.init
    hostingController.rootView = AnyView(PickerView(props: props))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }
}
