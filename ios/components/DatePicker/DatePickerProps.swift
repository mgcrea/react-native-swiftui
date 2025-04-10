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

    // Ensure we have at least one component
    displayedComponents = try container.decodeDatePickerComponents(forKey: .displayedComponents)
    // Decode selection as ISO8601 date string
    let selectionString = try container.decodeIfPresent(String.self, forKey: .selection) ?? ""
    if !selectionString.isEmpty {
      let formatter = ISO8601DateFormatter()
      formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]

      if let date = formatter.date(from: selectionString) {
        selection = date
      } else {
        // Try more permissive formats if strict ISO8601 fails
        let fallbackFormatter = DateFormatter()
        fallbackFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"

        if let date = fallbackFormatter.date(from: selectionString) {
          selection = date
        } else {
          throw DecodingError.dataCorruptedError(
            forKey: .selection,
            in: container,
            debugDescription: "Invalid date format: \(selectionString)"
          )
        }
      }
    } else {
      var calendar = Calendar.current
//      calendar.timeZone = TimeZone(identifier: "UTC")!
      selection = calendar.startOfDay(for: Date())
    }

    // Decode datePickerStyle
    let styleString = try container.decodeIfPresent(String.self, forKey: .datePickerStyle) ?? "default"
    datePickerStyle = DatePickerStyle(rawValue: styleString) ?? .default
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

extension KeyedDecodingContainer {
  func decodeDatePickerComponents(forKey key: Key) throws -> DatePickerComponents {
    var datePickerComponents: DatePickerComponents = .date // Default to date
    if let componentArray = try? decodeIfPresent([String].self, forKey: key) {
      // Handle array of components: ["date", "hourAndMinute"]
      datePickerComponents = []
      for component in componentArray {
        switch component.lowercased() {
        case "date":
          datePickerComponents.insert(.date)
        case "hourandminute":
          datePickerComponents.insert(.hourAndMinute)
//        case "era", "epoch":
//          if #available(iOS 16.0, *) {
//            datePickerComponents.insert(.era)
//          }
        default:
          break
        }
      }
    } else if let singleComponent = try? decodeIfPresent(String.self, forKey: key) {
      // Simple single string component
      switch singleComponent.lowercased() {
      case "date":
        datePickerComponents = .date
      case "time":
        datePickerComponents = .hourAndMinute
      case "datetime":
        datePickerComponents = [.date, .hourAndMinute]
//      case "era", "epoch":
//        if #available(iOS 16.0, *) {
//          datePickerComponents = .era
//        }
      default:
        datePickerComponents = .date
      }
    }
    return datePickerComponents
  }
}
