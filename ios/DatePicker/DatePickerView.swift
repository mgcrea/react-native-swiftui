import Combine
import SwiftUI
import UIKit

// MARK: - Props

public final class DatePickerProps: ObservableObject {
  @Published public var selection: Date
  @Published public var label: String
  @Published public var displayedComponents: DatePickerComponents
  public var onChange: ((Date) -> Void)?

  public init(
    selection: Date = Date(),
    label: String = "",
    displayedComponents: DatePickerComponents = [.date]
  ) {
    self.selection = selection
    self.label = label
    self.displayedComponents = displayedComponents
  }

  public func update(with newDictionary: [String: Any]) {
    if let label = newDictionary["label"] as? String {
      self.label = label
    }
    if let selectionString = newDictionary["selection"] as? String,
       let date = ISO8601DateFormatter().date(from: selectionString)
    {
      if selection != date {
        selection = date
        onChange?(date)
      }
    }
    if let componentsString = newDictionary["displayedComponents"] as? String {
      displayedComponents = componentsString == "date" ? .date : [.date, .hourAndMinute]
    }
  }
}

// MARK: - View

public struct DatePickerView: View {
  @ObservedObject public var props: DatePickerProps

  public init(props: DatePickerProps) {
    self.props = props
  }

  public var body: some View {
    DatePicker(props.label,
               selection: $props.selection,
               displayedComponents: props.displayedComponents)
      .datePickerStyle(.compact)
      .onChange(of: props.selection) { newValue in
        print("DatePicker value changed: \(newValue)")
        props.onChange?(newValue)
      }
  }
}

// MARK: - Container

@objc(DatePickerContainerView)
public class DatePickerContainerView: SwiftUIContainerView {
  private let props: DatePickerProps
  private var cancellables: Set<AnyCancellable> = []
  @objc public var onChange: ((Date) -> Void)?

  @objc
  public init(frame _: CGRect) {
    props = DatePickerProps()
    super.init(rootView: AnyView(EmptyView())) // Temporary rootView

    props.onChange = { [weak self] newValue in
      self?.onChange?(newValue)
    }
    // Set the real rootView after super.init
    hostingController.rootView = AnyView(DatePickerView(props: props))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }
}
