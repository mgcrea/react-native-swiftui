import SwiftUI

// MARK: - Props

public final class PickerProps: NodeProps {
  @Published var options: [PickerOption] = [] {
    didSet { refreshComputedOptions() }
  }

  @Published var config: PickerConfig? {
    didSet { refreshComputedOptions() }
  }
  @Published var selection: String = ""
  @Published var label: String = ""
  @Published var labelStyle: StyleProps?
  @Published var pickerStyle: PickerStyle = .default
  /// Set by `PickerContainer`, never sent from JS. props-parity:internal
  @Published var isRootView: Bool = false
  @Published var controlSize: ControlSize?
  @Published var disabled: Bool = false
  @Published public var style: StyleProps?
  // Events
  public var onChange: ((String) -> Void)?
  public var onFocus: (() -> Void)?
  public var onBlur: (() -> Void)?

  struct PickerOption: Identifiable, Decodable, Hashable {
    let label: String
    let value: String
    let icon: String?
    var id: String { value } // Use value as the unique identifier

    init(label: String, value: String, icon: String? = nil) {
      self.label = label
      self.value = value
      self.icon = icon
    }

    init(from decoder: Decoder) throws {
      let container = try decoder.container(keyedBy: CodingKeys.self)
      label = try container.decode(String.self, forKey: .label)
      value = try container.decode(String.self, forKey: .value)
      icon = try container.decodeIfPresent(String.self, forKey: .icon)
    }

    private enum CodingKeys: String, CodingKey {
      case label, value, icon
    }
  }

  struct PickerConfig: Decodable, Hashable {
    let min: Int
    let max: Int
    let step: Int
    let prefix: String
    let suffix: String

    /// Upper bound on generated options. More entries than this is a bug in the
    /// caller's config, not something a user can scroll through.
    private static let maxGeneratedOptions = 10_000

    // Generate options based on numeric configuration
    func generateOptions() -> [PickerOption] {
      // `step` arrives from JS unvalidated. The previous
      // `while current <= max { current += step }` looped forever on the main
      // thread for `step: 0` (and for any negative step), and allocated without
      // bound for a large range. `stride` cannot loop forever, and the cap keeps
      // a huge min/max from exhausting memory.
      guard step > 0, min <= max else {
        return []
      }

      return stride(from: min, through: max, by: step)
        .prefix(Self.maxGeneratedOptions)
        .map { PickerOption(label: "\(prefix)\($0)\(suffix)", value: "\($0)") }
    }
  }

  /// Stored, not computed: this is read inside the `ForEach` on every body
  /// evaluation, and a numeric `config` generates up to 10,000 options.
  private(set) var computedOptions: [PickerOption] = []

  /// Property observers do not fire from within `init`, so `init(from:)` calls
  /// this explicitly; every later write goes through `didSet`.
  private func refreshComputedOptions() {
    computedOptions = config?.generateOptions() ?? options
  }

  enum PickerStyle: String, CaseIterable {
    case `default`
    case menu
    case segmented
    case wheel
    case inline

    @ViewBuilder
    func applyStyle<V: View>(_ view: V) -> some View {
      switch self {
      case .default:
        view.pickerStyle(DefaultPickerStyle())
      case .menu:
        view.pickerStyle(MenuPickerStyle())
      case .segmented:
        view.pickerStyle(SegmentedPickerStyle())
      case .wheel:
        view.pickerStyle(WheelPickerStyle())
      case .inline:
        view.pickerStyle(InlinePickerStyle())
      }
    }
  }

  enum ControlSize: String, Decodable {
    case mini, small, regular, large, extraLarge

    @ViewBuilder
    func apply<V: View>(_ view: V) -> some View {
      switch self {
      case .mini:
        view.controlSize(.mini)
      case .small:
        view.controlSize(.small)
      case .regular:
        view.controlSize(.regular)
      case .large:
        view.controlSize(.large)
      case .extraLarge:
        if #available(iOS 17.0, *) {
          view.controlSize(.extraLarge)
        } else {
          view.controlSize(.large)
        }
      }
    }
  }

  // Coding keys for decoding
  /// Keys that were in the payload this object was decoded from. See `NodeProps`.
  private(set) var presentKeys: Set<String> = []

  enum CodingKeys: String, CodingKey, CaseIterable {
    case label, labelStyle, selection, options, config, pickerStyle, controlSize, disabled, style
  }

  // Decodable initializer
  public required init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    presentKeys = container.presentKeys
    label = try container.decodeIfPresent(String.self, forKey: .label) ?? ""
    labelStyle = try container.decodeIfPresent(StyleProps.self, forKey: .labelStyle)
    selection = try container.decodeIfPresent(String.self, forKey: .selection) ?? ""
    options = try container.decodeIfPresent([PickerOption].self, forKey: .options) ?? []
    config = try container.decodeIfPresent(PickerConfig.self, forKey: .config)
    pickerStyle = try container.decodeEnum(PickerStyle.self, forKey: .pickerStyle, default: .default)
    controlSize = try container.decodeIfPresent(ControlSize.self, forKey: .controlSize)
    disabled = try container.decodeIfPresent(Bool.self, forKey: .disabled) ?? false
    style = try container.decodeIfPresent(StyleProps.self, forKey: .style)
    refreshComputedOptions()
  }

  public init() {}

  public func merge(from other: PickerProps) {
    assign(\.options, .options, from: other)
    assign(\.selection, .selection, from: other)
    assign(\.config, .config, from: other)
    assign(\.label, .label, from: other)
    assign(\.labelStyle, .labelStyle, from: other)
    assign(\.pickerStyle, .pickerStyle, from: other)
    assign(\.controlSize, .controlSize, from: other)
    assign(\.disabled, .disabled, from: other)
    assign(\.style, .style, from: other)
  }
}

// MARK: - Node

extension PickerProps {
  static let nodeType = "Picker"

  static func makeView(props: PickerProps, children: [any SwiftUINode]?) -> AnyView {
    AnyView(PickerView(props: props))
  }

  func bindEvents(emit: @escaping (_ name: String, _ value: String?) -> Void) {
    onChange = { emit("change", $0) }
    onFocus = { emit("focus", nil) }
    onBlur = { emit("blur", nil) }
  }
}
