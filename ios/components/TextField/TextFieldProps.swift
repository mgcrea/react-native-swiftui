import SwiftUI

// MARK: - Props

final class TextFieldProps: ObservableObject, Decodable {
  @Published public var text: String = ""
  @Published public var label: String = ""
  @Published public var labelStyle: StyleProps?
  @Published public var placeholder: String = ""
  @Published public var keyboardType: UIKeyboardType = .default
  @Published public var textContentType: UITextContentType? = nil
  @Published public var returnKeyType: UIReturnKeyType = .default
  @Published public var submitLabel: SubmitLabel? = nil
  @Published public var autocapitalizationType: UITextAutocapitalizationType? = nil
  @Published public var maxLength: Int? = nil
  @Published public var secure: Bool = false
  @Published public var multiline: Bool = false
  @Published public var disabled: Bool = false
  @Published public var error: Bool = false
  @Published public var helperText: String = ""
  @Published public var style: StyleProps?
  // Events
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  enum CodingKeys: String, CodingKey {
    case text, label, labelStyle, placeholder, keyboardType, textContentType, returnKeyType, submitLabel, autocapitalizationType, maxLength, secure, multiline, disabled, error, helperText, style
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    text = try container.decodeIfPresent(String.self, forKey: .text) ?? ""
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    placeholder = try container.decodeIfPresent(String.self, forKey: .placeholder) ?? ""
    // Decode keyboardType
    if let keyboardTypeString = try container.decodeIfPresent(String.self, forKey: .keyboardType) {
      switch keyboardTypeString {
      case "numberPad": keyboardType = .numberPad
      case "emailAddress": keyboardType = .emailAddress
      case "decimalPad": keyboardType = .decimalPad
      default: keyboardType = .default
      }
    }
    // Decode textContentType
    if let textContentTypeString = try container.decodeIfPresent(String.self, forKey: .textContentType) {
      switch textContentTypeString {
      case "username": textContentType = .username
      case "password": textContentType = .password
      case "emailAddress": textContentType = .emailAddress
      default: textContentType = nil
      }
    }
    // Decode returnKeyType
    if let returnKeyTypeString = try container.decodeIfPresent(String.self, forKey: .returnKeyType) {
      switch returnKeyTypeString {
      case "done": returnKeyType = .done
      case "next": returnKeyType = .next
      case "search": returnKeyType = .search
      default: returnKeyType = .default
      }
    }
    // Decode autocapitalizationType
    if let autocapitalizationTypeString = try container.decodeIfPresent(String.self, forKey: .autocapitalizationType) {
      switch autocapitalizationTypeString {
      case "none": autocapitalizationType = UITextAutocapitalizationType.none
      case "words": autocapitalizationType = .words
      case "sentences": autocapitalizationType = .sentences
      case "allCharacters": autocapitalizationType = .allCharacters
      default: autocapitalizationType = .sentences
      }
    }
    submitLabel = try container.decodeSubmitLabelIfPresent(forKey: .submitLabel)
    maxLength = try container.decodeIfPresent(Int.self, forKey: .maxLength) ?? nil
    secure = try container.decodeIfPresent(Bool.self, forKey: .secure) ?? false
    multiline = try container.decodeIfPresent(Bool.self, forKey: .multiline) ?? false
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    error = try container.decodeIfPresent(Bool.self, forKey: .error) ?? false
    helperText = try container.decodeIfPresent(String.self, forKey: .helperText) ?? ""
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)

    if maxLength != nil {
      text = enforceMaxLength(text)
    }
  }

  private func enforceMaxLength(_ newText: String) -> String {
    if let maxLength = maxLength, newText.count > maxLength {
      return String(newText.prefix(maxLength))
    }
    return newText
  }

  public func merge(from other: TextFieldProps, presentKeys: Set<String>) {
    assign(\.text, from: other, key: "text", presentKeys: presentKeys)
    assign(\.label, from: other, key: "label", presentKeys: presentKeys)
    assign(\.labelStyle, from: other, key: "labelStyle", presentKeys: presentKeys)
    assign(\.placeholder, from: other, key: "placeholder", presentKeys: presentKeys)
    assign(\.keyboardType, from: other, key: "keyboardType", presentKeys: presentKeys)
    assign(\.textContentType, from: other, key: "textContentType", presentKeys: presentKeys)
    assign(\.returnKeyType, from: other, key: "returnKeyType", presentKeys: presentKeys)
    // SwiftUI's `SubmitLabel` is an opaque struct with no public members and no
    // `Equatable` conformance, so this one cannot compare before assigning and
    // stays unconditional. It drives no `onChange`, so it cannot echo.
    if presentKeys.contains("submitLabel") {
      submitLabel = other.submitLabel
    }
    assign(\.autocapitalizationType, from: other, key: "autocapitalizationType", presentKeys: presentKeys)
    assign(\.maxLength, from: other, key: "maxLength", presentKeys: presentKeys)
    assign(\.secure, from: other, key: "secure", presentKeys: presentKeys)
    assign(\.multiline, from: other, key: "multiline", presentKeys: presentKeys)
    assign(\.disabled, from: other, key: "disabled", presentKeys: presentKeys)
    assign(\.error, from: other, key: "error", presentKeys: presentKeys)
    assign(\.helperText, from: other, key: "helperText", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
  }
}


extension KeyedDecodingContainer {
  
  func decodeSubmitLabelIfPresent(forKey key: Key) throws -> SubmitLabel? {
    if let submitLabelString = try decodeIfPresent(String.self, forKey: key) {
      switch submitLabelString {
      case "continue":
        return .continue
      case "done":
        return .done
      case "go":
        return .go
      case "join":
        return .join
      case "next":
        return .next
      case "return":
        return .return
      case "route":
        return .route
      case "search":
        return .search
      case "send":
        return .send
      default:
        return nil
      }
    }
    return nil
  }
  
}
