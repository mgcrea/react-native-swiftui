import SwiftUI

public final class ButtonProps: NodeProps {
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

  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey {
    case title, style, buttonStyle, disabled
  }

  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    title = try container.decodeIfPresent(String.self, forKey: .title)
    buttonStyle = try container.decodeEnum(ButtonStyle.self, forKey: .buttonStyle, default: .default)
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
  }

  public func merge(from other: ButtonProps) {
    assign(\.title, .title, from: other)
    assign(\.buttonStyle, .buttonStyle, from: other)
    assign(\.disabled, .disabled, from: other)
    assign(\.style, .style, from: other)
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

// MARK: - Node

extension ButtonProps {
  static let nodeType = "Button"

  static func makeView(props: ButtonProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(ButtonView(props: props) { childrenView(children) })
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onPress = { emit("press", nil) }
  }
}
