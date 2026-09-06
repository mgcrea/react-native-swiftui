import SwiftUI

// MARK: - Props

public final class DatePickerProps: NodeProps {
  @Published var selection: Date = .init()
  @Published var label: String = ""
  @Published var labelStyle: StyleProps?
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

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case label, labelStyle, selection, displayedComponents, datePickerStyle, disabled
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys

    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)

    // Ensure we have at least one component
    displayedComponents = try container.decodeDatePickerComponents(forKey: .displayedComponents)
    // Decode selection as ISO8601 date string. An unparseable date falls back
    // rather than throwing: a throw here failed the whole tree decode and
    // rendered "Invalid view tree" (see SliderProps for the same precedent).
    let selectionString = try container.decodeIfPresent(String.self, forKey: .selection) ?? ""
    if selectionString.isEmpty {
      selection = Calendar.current.startOfDay(for: Date())
    } else if let date = ISO8601.date(from: selectionString) {
      selection = date
    } else {
      print("DatePicker: invalid date \"\(selectionString)\", falling back to now")
      selection = Date()
    }

    datePickerStyle = try container.decodeEnum(DatePickerStyle.self, forKey: .datePickerStyle, default: .default)
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
  }

  public func merge(from other: DatePickerProps) {
    assign(\.selection, .selection, from: other)
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.datePickerStyle, .datePickerStyle, from: other)
    assign(\.displayedComponents, .displayedComponents, from: other)
    assign(\.disabled, .disabled, from: other)
  }
}

// MARK: - Node

extension DatePickerProps {
  static let nodeType = "DatePicker"

  static func makeView(props: DatePickerProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(DatePickerView(props: props))
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", ISO8601.string(from: $0)) }
    onFocus = { emit("focus", nil) }
    onBlur = { emit("blur", nil) }
  }
}
