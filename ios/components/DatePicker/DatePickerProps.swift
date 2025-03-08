import SwiftUI

// MARK: - Props

public final class DatePickerProps: ObservableObject, Decodable {
  @Published var selection: Date = .init()
  @Published var label: String = ""
  @Published var datePickerStyle: DatePickerStyle = .default
  @Published var displayedComponents: DatePickerComponents = [.date]
  @Published var disabled: Bool = false
  // Events
  public var onChange: ((Date) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  enum DatePickerStyle: String, CaseIterable {
    case `default`
    case compact
    case field
    case graphical
    case stepperField
    case wheel

    @ViewBuilder
    func applyStyle<V: View>(_ view: V) -> some View {
      switch self {
      case .default:
        view.datePickerStyle(DefaultDatePickerStyle())
      case .compact:
        view.datePickerStyle(CompactDatePickerStyle())
      case .field:
        #if os(macOS)
          view.datePickerStyle(FieldDatePickerStyle())
        #else
          view.datePickerStyle(DefaultDatePickerStyle())
        #endif
      case .graphical:
        view.datePickerStyle(GraphicalDatePickerStyle())
      case .stepperField:
        #if os(macOS)
          view.datePickerStyle(StepperFieldDatePickerStyle())
        #else
          view.datePickerStyle(DefaultDatePickerStyle())
        #endif
      case .wheel:
        view.datePickerStyle(WheelDatePickerStyle())
      }
    }
  }

  public init() {}

  enum CodingKeys: String, CodingKey {
    case label, selection, displayedComponents, datePickerStyle, disabled
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)

    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    // Decode selection as ISO8601 date string
    let selectionString = try container.decode(String.self, forKey: .selection)
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    guard let date = formatter.date(from: selectionString) else {
      throw DecodingError.dataCorruptedError(
        forKey: .selection,
        in: container,
        debugDescription: "Invalid date format: \(selectionString)"
      )
    }
    selection = date
    // Decode datePickerStyle
    let styleString = try container.decodeIfPresent(String.self, forKey: .datePickerStyle) ?? "default"
    datePickerStyle = DatePickerStyle(rawValue: styleString) ?? .default
    // Decode displayedComponents
    let componentsString = try container.decode(String.self, forKey: .displayedComponents)
    displayedComponents = componentsString == "date" ? .date : [.date, .hourAndMinute]
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
  }

  public func merge(from other: DatePickerProps) {
    selection = other.selection
    label = other.label
    datePickerStyle = other.datePickerStyle
    displayedComponents = other.displayedComponents
    disabled = other.disabled
  }
}
