import SwiftUI

public final class ButtonProps: ObservableObject, Decodable {
  @Published var title: String? = nil
  @Published var buttonStyle: ButtonStyle = .default
  @Published var disabled: Bool = false
  @Published public var style: StyleProps?
  // Events
  public var onPress: (() -> Void)?

  enum ButtonStyle: String, CaseIterable {
    case `default`
    case plain
    case bordered
    case borderedProminent
    case borderless
    // Custom
    case scale
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
      case .scale:
        view.buttonStyle(ScaleButtonStyle())
      case .picker:
        view.buttonStyle(PickerButtonStyle())
      }
    }
  }

  enum CodingKeys: String, CodingKey {
    case title, style, buttonStyle, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    title = try container.decodeIfPresent(String.self, forKey: .title)
    if let buttonStyleString = try container.decodeIfPresent(String.self, forKey: .buttonStyle), let style = ButtonStyle(rawValue: buttonStyleString) {
      buttonStyle = style
    } else {
      buttonStyle = .default
    }
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ButtonProps, presentKeys: Set<String>) {
    assign(\.title, from: other, key: "title", presentKeys: presentKeys)
    assign(\.buttonStyle, from: other, key: "buttonStyle", presentKeys: presentKeys)
    assign(\.disabled, from: other, key: "disabled", presentKeys: presentKeys)
    assign(\.style, from: other, key: "style", presentKeys: presentKeys)
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

struct ScaleButtonStyle: ButtonStyle {
  var normalScale: Double = 1.0
  var pressedScale: Double = 0.95

  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .scaleEffect(configuration.isPressed ? pressedScale : normalScale)
      .animation(.spring(response: 0.3, dampingFraction: 0.6), value: configuration.isPressed)
  }
}
