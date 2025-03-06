import SwiftUI

// MARK: - Props

public final class DatePickerProps: ObservableObject {
  @Published public var selection: Date
  @Published public var label: String
  @Published public var displayedComponents: DatePickerComponents
  // Events
  public var onChange: ((Date) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

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
