import SwiftUI

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

public final class SheetPickerProps: ObservableObject, Decodable {
  @Published public var isPresented: Bool = false
  @Published public var title: String = ""
  @Published public var searchPlaceholder: String = "Search"
  @Published public var selectedValue: String = ""
  @Published public var options: [SheetPickerOption] = []
  @Published public var searchText: String = ""
  @Published public var autoDismiss: Bool = true

  public var onSelect: ((String) -> Void)?
  public var onDismiss: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case isPresented
    case title
    case searchPlaceholder
    case selectedValue
    case options
    case autoDismiss
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    isPresented = try container.decodeIfPresent(Bool.self, forKey: .isPresented) ?? false
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
    searchPlaceholder = try container.decodeIfPresent(String.self, forKey: .searchPlaceholder) ?? "Search"
    selectedValue = try container.decodeIfPresent(String.self, forKey: .selectedValue) ?? ""
    options = try container.decodeIfPresent([SheetPickerOption].self, forKey: .options) ?? []
    autoDismiss = try container.decodeIfPresent(Bool.self, forKey: .autoDismiss) ?? true
  }

  public init() {}

  public func merge(from other: SheetPickerProps) {
    if isPresented != other.isPresented {
      isPresented = other.isPresented
    }
    if title != other.title {
      title = other.title
    }
    if searchPlaceholder != other.searchPlaceholder {
      searchPlaceholder = other.searchPlaceholder
    }
    if selectedValue != other.selectedValue {
      selectedValue = other.selectedValue
    }
    if options != other.options {
      options = other.options
    }
    if autoDismiss != other.autoDismiss {
      autoDismiss = other.autoDismiss
    }
  }

  public var filteredOptions: [SheetPickerOption] {
    let trimmed = searchText.trimmingCharacters(in: .whitespacesAndNewlines)
    guard !trimmed.isEmpty else { return options }
    return options.filter { option in
      option.label.localizedCaseInsensitiveContains(trimmed) || option.value.localizedCaseInsensitiveContains(trimmed)
    }
  }

  public func select(value: String) {
    if selectedValue != value {
      selectedValue = value
    }
    searchText = ""
    onSelect?(value)
    if autoDismiss && isPresented {
      isPresented = false
    }
  }
}
