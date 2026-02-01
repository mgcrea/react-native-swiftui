import SwiftUI

// MARK: - View

public struct PickerView: View {
  @ObservedObject var props: PickerProps
  @FocusState private var isFocused: Bool

  public init(props: PickerProps, onSelectionChanged _: ((String) -> Void)? = nil) {
    self.props = props
  }

  public var body: some View {
    Group {
      // Only segmented standalone pickers need an explicit external label
      if props.label.isEmpty || (!props.isRootView && props.pickerStyle != .segmented) {
        pickerContent()
      } else {
        labeledPicker()
      }
    }
  }

  @ViewBuilder
  private func pickerContent() -> some View {
    props.pickerStyle.applyStyle(
      Picker(selection: $props.selection, label: labelView()) {
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
      .onChange(of: props.selection) { newValue in
        props.onChange?(newValue)
      }
    )
    .applyStyles(props.style)
  }

  @ViewBuilder
  private func labeledPicker() -> some View {
    if #available(iOS 16.0, *) {
      LabeledContent {
        pickerContent()
      } label: {
        labelView()
      }
    } else {
      HStack(alignment: .firstTextBaseline) {
        labelView()
          .font(.body)
        Spacer()
        pickerContent()
          .foregroundColor(.secondary)
      }
      .padding(.vertical, 4)
    }
  }

  @ViewBuilder
  private func labelView() -> some View {
    Text(props.label)
      .applyStyles(props.labelStyle)
  }
}
