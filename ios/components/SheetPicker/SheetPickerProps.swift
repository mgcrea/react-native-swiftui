import SwiftUI

public enum SheetPickerDisplayMode: String, Decodable {
  case standalone
  case embedded
}

public struct SheetPickerOption: Identifiable, Decodable, Hashable {
  public let label: String
  public let value: String

  public var id: String { value }

  enum CodingKeys: String, CodingKey {
    case label, value
  }

  public init(label: String, value: String) {
    self.label = label
    self.value = value
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    value = try container.decode(String.self, forKey: .value)
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? value
  }
}

public final class SheetPickerProps: NodeProps {
  @Published public var isPresented: Bool = false
  @Published public var title: String = ""
  @Published public var searchPlaceholder: String = "Search"
  @Published public var selectedValue: String = ""
  @Published public var options: [SheetPickerOption] = []
  /// Live contents of the search field, owned by the view. props-parity:internal
  @Published public var searchText: String = ""
  @Published public var autoDismiss: Bool = true
  @Published public var label: String = ""
  @Published public var labelStyle: StyleProps?
  @Published public var placeholder: String = ""
  @Published public var disabled: Bool = false
  @Published public var displayMode: SheetPickerDisplayMode = .standalone

  public var onSelect: ((String) -> Void)?
  public var onDismiss: (() -> Void)?
  internal var isAutoDismissing: Bool = false

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case isPresented
    case title
    case searchPlaceholder
    case selectedValue
    case options
    case autoDismiss
    case label
    case labelStyle
    case placeholder
    case disabled
    case displayMode
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    isPresented = try container.decodeIfPresent(Bool.self, forKey: .isPresented) ?? false
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
    searchPlaceholder = try container.decodeIfPresent(String.self, forKey: .searchPlaceholder) ?? "Search"
    selectedValue = try container.decodeIfPresent(String.self, forKey: .selectedValue) ?? ""
    options = try container.decodeIfPresent([SheetPickerOption].self, forKey: .options) ?? []
    autoDismiss = try container.decodeIfPresent(Bool.self, forKey: .autoDismiss) ?? true
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    placeholder = try container.decodeIfPresent(String.self, forKey: .placeholder) ?? ""
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    displayMode = try container.decodeEnum(SheetPickerDisplayMode.self, forKey: .displayMode, default: .standalone)
  }

  public init() {}

  public func merge(from other: SheetPickerProps) {
    assign(\.isPresented, .isPresented, from: other)
    assign(\.title, .title, from: other)
    assign(\.searchPlaceholder, .searchPlaceholder, from: other)
    assign(\.selectedValue, .selectedValue, from: other)
    assign(\.options, .options, from: other)
    assign(\.autoDismiss, .autoDismiss, from: other)
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.placeholder, .placeholder, from: other)
    assign(\.disabled, .disabled, from: other)
    assign(\.displayMode, .displayMode, from: other)
  }

  public var filteredOptions: [SheetPickerOption] {
    let trimmed = searchText.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else { return options }
    return options.filter { option in
      option.label.localizedCaseInsensitiveContains(trimmed) || option.value.localizedCaseInsensitiveContains(trimmed)
    }
  }

  public var hasSelection: Bool {
    !selectedValue.isEmpty
  }

  public var resolvedSelectedLabel: String {
    if let option = options.first(where: { $0.value == selectedValue }) {
      return option.label
    }
    if !selectedValue.isEmpty {
      return selectedValue
    }
    if !placeholder.isEmpty {
      return placeholder
    }
    return "Select"
  }

  public func select(value: String) {
    if selectedValue != value {
      selectedValue = value
    }
    searchText = ""
    onSelect?(value)
    if autoDismiss && isPresented {
      isAutoDismissing = true
      isPresented = false
    }
  }
}

// MARK: - Node

extension SheetPickerProps {
  static let nodeType = "SheetPicker"

  static func makeView(props: SheetPickerProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(SheetPickerView(props: props))
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onSelect = { emit("change", $0) }
    onDismiss = { emit("dismiss", nil) }
  }
}
