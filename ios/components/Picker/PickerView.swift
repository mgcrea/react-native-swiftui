import SwiftUI

// MARK: - View

public struct PickerView: View {
  @ObservedObject var props: PickerProps
  @FocusState private var isFocused: Bool
  /// Bound by the control instead of `props`, so a props-driven update can be
  /// told apart from a user selection. See `pickerContent()`.
  @State private var localSelection: String

  public init(props: PickerProps, onSelectionChanged _: ((String) -> Void)? = nil) {
    self.props = props
    _localSelection = State(initialValue: props.selection)
  }

  public var body: some View {
    Group {
      // Only segmented standalone pickers need an explicit external label
      if props.label.isEmpty || (!props.isRootView && props.pickerStyle != .segmented) {
        pickerContent()
      } else {
        LabeledContentView(label: props.label, labelStyle: props.labelStyle, fallbackPadding: 4) {
          pickerContent()
        }
      }
    }
  }

  @ViewBuilder
  private func pickerContent() -> some View {
    props.pickerStyle.applyStyle(
      Picker(selection: $localSelection, label: labelView()) {
        ForEach(props.computedOptions) { option in
          if props.pickerStyle == .segmented, let icon = option.icon {
            Label(option.label, systemImage: icon).tag(option.value)
          } else {
            Text(option.label).tag(option.value)
          }
        }
      }
      .onChange(of: isFocused) { newValue in
        newValue ? props.onFocus?() : props.onBlur?()
      }
      .onChange(of: localSelection) { newValue in
        // The props observer below assigns local first, so a JS-driven update is
        // already equal here and emits nothing.
        guard newValue != props.selection else { return }
        props.selection = newValue
        props.onChange?(newValue)
      }
      .onChange(of: props.selection) { newValue in
        // Sync only — never emits.
        localSelection = newValue
      }
    )
    .modifier(ControlSizeModifier(controlSize: props.controlSize))
    .applyStyles(props.style)
  }

  @ViewBuilder
  private func labelView() -> some View {
    Text(props.label)
      .applyStyles(props.labelStyle)
  }
}

// MARK: - Control Size Modifier

private struct ControlSizeModifier: ViewModifier {
  let controlSize: PickerProps.ControlSize?

  func body(content: Content) -> some View {
    if let controlSize {
      controlSize.apply(content)
    } else {
      content
    }
  }
}
