import SwiftUI

public final class ButtonProps: ObservableObject, Decodable {
  @Published var title: String = "Button"
  @Published var buttonStyle: ButtonStyle = .default
  @Published var disabled: Bool = false
  public var style: StyleProps?
  // Events
  public var onPress: (() -> Void)?

  enum ButtonStyle: String, CaseIterable {
    case `default`
    case plain
    case bordered
    case borderedProminent
    case borderless
    // Custom
    case subtle
    case picker

    @ViewBuilder
    func applyStyle<V: View>(_ view: V) -> some View {
      switch self {
      case .default:
        view.buttonStyle(DefaultButtonStyle())
      case .plain:
        view.buttonStyle(PlainButtonStyle())
      case .bordered:
        view.buttonStyle(BorderedButtonStyle())
      case .borderedProminent:
        view.buttonStyle(BorderedProminentButtonStyle())
      case .borderless:
        view.buttonStyle(BorderlessButtonStyle())
      // Custom
      case .subtle:
        view.buttonStyle(SubtleOpacityButtonStyle())
      case .picker:
        view.buttonStyle(PickerButtonStyle())
      }
    }
  }

  enum CodingKeys: String, CodingKey {
    case title, style, buttonStyle
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    title = try container.decodeIfPresent(String.self, forKey: .title) ?? ""
    if let buttonStyleString = try container.decodeIfPresent(String.self, forKey: .buttonStyle), let style = ButtonStyle(rawValue: buttonStyleString) {
      buttonStyle = style
    } else {
      buttonStyle = .default
    }
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ButtonProps) {
    title = other.title
    buttonStyle = other.buttonStyle
    style = other.style
  }
}

struct PickerButtonStyle: ButtonStyle {
  var normalOpacity: Double = 1.0
  var pressedOpacity: Double = 0.3

  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .opacity(configuration.isPressed ? pressedOpacity : normalOpacity)
      .animation(.easeIn(duration: 0.35), value: configuration.isPressed)
  }
}

struct SubtleOpacityButtonStyle: ButtonStyle {
  var normalOpacity: Double = 1.0
  var pressedOpacity: Double = 0.3

  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .opacity(configuration.isPressed ? pressedOpacity : normalOpacity)
      .animation(configuration.isPressed ? .linear(duration: 0.05) : .easeInOut(duration: 0.25), value: configuration.isPressed)
  }
}
