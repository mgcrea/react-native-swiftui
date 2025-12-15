import SwiftUI

// MARK: - Props

public final class TextFieldProps: ObservableObject, Decodable {
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

  public func merge(from other: TextFieldProps) {
    text = other.text
    label = other.label
    labelStyle = other.labelStyle
    placeholder = other.placeholder
    keyboardType = other.keyboardType
    textContentType = other.textContentType
    returnKeyType = other.returnKeyType
    submitLabel = other.submitLabel
    autocapitalizationType = other.autocapitalizationType
    maxLength = other.maxLength
    secure = other.secure
    multiline = other.multiline
    disabled = other.disabled
    error = other.error
    helperText = other.helperText
    style = other.style
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
