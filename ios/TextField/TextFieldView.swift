import Combine
import SwiftUI
import UIKit

// MARK: - Props

public final class TextFieldProps: ObservableObject {
  @Published public var text: String
  @Published public var label: String
  @Published public var placeholder: String
  @Published public var keyboardType: UIKeyboardType
  @Published public var textContentType: UITextContentType?
  @Published public var returnKeyType: UIReturnKeyType
  @Published public var isEnabled: Bool
  @Published public var isSecureTextEntry: Bool
  @Published public var autocapitalizationType: UITextAutocapitalizationType
  @Published public var maxLength: Int? // New: Optional max length
  @Published public var multiline: Bool // New: Single vs. multi-line
  public var onChange: ((String) -> Void)?

  public init(
    text: String = "",
    label: String = "",
    placeholder: String = "",
    keyboardType: UIKeyboardType = .default,
    textContentType: UITextContentType? = nil,
    returnKeyType: UIReturnKeyType = .default,
    isEnabled: Bool = true,
    isSecureTextEntry: Bool = false,
    autocapitalizationType: UITextAutocapitalizationType = .sentences,
    maxLength: Int? = nil,
    multiline: Bool = false
  ) {
    self.text = text
    self.label = label
    self.placeholder = placeholder
    self.keyboardType = keyboardType
    self.textContentType = textContentType
    self.returnKeyType = returnKeyType
    self.isEnabled = isEnabled
    self.isSecureTextEntry = isSecureTextEntry
    self.autocapitalizationType = autocapitalizationType
    self.maxLength = maxLength
    self.multiline = multiline
  }

  public func update(with newDictionary: [String: Any]) {
    print("Updating TextFieldProps with:", newDictionary)
    if let placeholder = newDictionary["placeholder"] as? String {
      self.placeholder = placeholder
    }
    if let text = newDictionary["text"] as? String {
      if self.text != text {
        self.text = enforceMaxLength(text)
//                onChange?(self.text)
      }
    }

    if let label = newDictionary["label"] as? String {
      self.label = label
    }
    if let keyboardTypeString = newDictionary["keyboardType"] as? String {
      switch keyboardTypeString {
      case "numberPad": keyboardType = .numberPad
      case "emailAddress": keyboardType = .emailAddress
      case "decimalPad": keyboardType = .decimalPad
      default: keyboardType = .default
      }
    }
    if let contentTypeString = newDictionary["textContentType"] as? String {
      switch contentTypeString {
      case "username": textContentType = .username
      case "password": textContentType = .password
      case "emailAddress": textContentType = .emailAddress
      default: textContentType = nil
      }
    }
    if let returnKeyString = newDictionary["returnKeyType"] as? String {
      switch returnKeyString {
      case "done": returnKeyType = .done
      case "next": returnKeyType = .next
      case "search": returnKeyType = .search
      default: returnKeyType = .default
      }
    }
    if let isEnabled = newDictionary["isEnabled"] as? Bool {
      self.isEnabled = isEnabled
    }
    if let isSecure = newDictionary["isSecureTextEntry"] as? Bool {
      isSecureTextEntry = isSecure
    }
    if let autocapString = newDictionary["autocapitalizationType"] as? String {
      switch autocapString {
      case "none": autocapitalizationType = .none
      case "words": autocapitalizationType = .words
      case "sentences": autocapitalizationType = .sentences
      case "allCharacters": autocapitalizationType = .allCharacters
      default: autocapitalizationType = .sentences
      }
    }
    if let maxLength = newDictionary["maxLength"] as? Int {
      self.maxLength = maxLength
      text = enforceMaxLength(text) // Apply maxLength on update
    }
    if let multiline = newDictionary["multiline"] as? Bool {
      self.multiline = multiline
    }
  }

  private func enforceMaxLength(_ newText: String) -> String {
    if let maxLength = maxLength, newText.count > maxLength {
      return String(newText.prefix(maxLength))
    }
    return newText
  }
}

// MARK: - View

public struct TextFieldView: View {
  @ObservedObject public var props: TextFieldProps

  public init(props: TextFieldProps) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty {
      Group {
        if props.multiline {
          TextEditor(text: $props.text)
        } else if props.isSecureTextEntry {
          SecureField(props.placeholder, text: $props.text)
        } else {
          TextField(props.placeholder, text: $props.text)
        }
      }
      .keyboardType(props.keyboardType)
      .onChange(of: props.text) { newValue in
        print("TextField value changed: \(newValue)")
        props.onChange?(newValue)
      }
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent(props.label) {
          Group {
            if props.multiline {
              TextEditor(text: $props.text)
            } else if props.isSecureTextEntry {
              SecureField(props.placeholder, text: $props.text)
            } else {
              TextField(props.placeholder, text: $props.text)
            }
          }
          .keyboardType(props.keyboardType)
          .onChange(of: props.text) { newValue in
            print("TextField value changed: \(newValue)")
            props.onChange?(newValue)
          }
        }
      } else {
        HStack {
          Text(props.label)
          Group {
            if props.multiline {
              TextEditor(text: $props.text)
            } else if props.isSecureTextEntry {
              SecureField(props.placeholder, text: $props.text)
            } else {
              TextField(props.placeholder, text: $props.text)
            }
          }
          .keyboardType(props.keyboardType)
          .onChange(of: props.text) { newValue in
            print("TextField value changed: \(newValue)")
            props.onChange?(newValue)
          }
        }
      }
    }
  }
}

// MARK: - Container

@objc(TextFieldContainerView)
public class TextFieldContainerView: SwiftUIContainerView {
  private let props: TextFieldProps
  private var cancellables: Set<AnyCancellable> = []
  @objc public var onChange: ((String) -> Void)?

  @objc
  public init(frame _: CGRect) {
    props = TextFieldProps()
    super.init(rootView: AnyView(EmptyView())) // Temporary rootView

    props.onChange = { [weak self] newValue in
      self?.onChange?(newValue)
    }
    // Set the real rootView after super.init
    hostingController.rootView = AnyView(TextFieldView(props: props))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }
}
