import SwiftUI

// MARK: - View

public struct MultiPickerView: View {
  @ObservedObject var props: MultiPickerProps
  /// Bound by the wheels instead of `props`, so a props-driven update can be told
  /// apart from a user selection. See `multiPickerContent()`.
  @State private var localSelections: [String]

  public init(props: MultiPickerProps, onSelectionsChanged _: ((String) -> Void)? = nil) {
    self.props = props
    _localSelections = State(initialValue: props.selections)
  }

  /// Bounds-checked so the wheels cannot trap. `components` and `selections`
  /// arrive as separate props, so a payload that grows `components` first leaves
  /// this indexing past the end of `selections` until normalization catches up —
  /// and a plain `$selections[index]` subscript binding crashes on that.
  private func selectionBinding(at index: Int) -> Binding<String> {
    Binding(
      get: { index < localSelections.count ? localSelections[index] : "" },
      set: { newValue in
        guard index < localSelections.count else { return }
        localSelections[index] = newValue
      }
    )
  }

  public var body: some View {
    LabeledContentView(label: props.label, labelStyle: props.labelStyle) {
      multiPickerContent()
    }
  }

  @ViewBuilder
  private func multiPickerContent() -> some View {
    GeometryReader { geometry in
      ZStack {
        RoundedRectangle(cornerSize: CGSizeMake(10, 10))
          .fill(Color.quaternarySystemFill)
          .padding(.horizontal, 8)
          .frame(width: geometry.size.width, height: 33)

        HStack(spacing: 0) {
          // `ForEach(0..<n)` is documented as valid only for a *constant* range
          // — it reads the range once and does not identify views across
          // updates. `components.count` comes from JS and can change, so this
          // was outside the API contract.
          //
          // Note: on iOS 26.5 the range form was measured to behave correctly
          // here, with no runtime warning, so this is hardening rather than a
          // fix for an observed symptom. The collection initializer is the
          // supported way to express a changing count. `\.offset` keeps the
          // index-based identity `selectionBinding(at:)` relies on, and avoids
          // the collision `\.element` would cause for two identically
          // configured components.
          ForEach(Array(props.components.enumerated()), id: \.offset) { index, component in
            ZStack(alignment: Alignment(horizontal: .trailing, vertical: .center)) {
              if !component.label.isEmpty && !component.computedOptions.isEmpty {
                Text(component.label)
                  .padding(.trailing, 16)
                  .font(.caption)
              }
              Picker(component.label, selection: selectionBinding(at: index)) {
                ForEach(component.computedOptions, id: \.value) { option in
                  Text(option.label).tag(option.value)
                }
              }
              .pickerStyle(.wheel)
              .frame(width: geometry.size.width / CGFloat(props.components.count))
              .clipped()
            }
          }
        }
      }
    }
    .applyStyles(props.style)
    .onChange(of: localSelections) { newValue in
      // The props observer below assigns local first, so a JS-driven update is
      // already equal here and emits nothing. Only a wheel turn gets through.
      guard newValue != props.selections else { return }
      props.selections = newValue
      notifySelectionsChanged()
    }
    .onChange(of: props.selections) { newValue in
      // Sync only — never emits.
      localSelections = newValue
    }
  }

  // Helper function to format and send selection changes
  private func notifySelectionsChanged() {
    if let onChange = props.onChange {
      // Convert selections array to JSON
      if let jsonData = try? JSONSerialization.data(withJSONObject: props.selections, options: []),
         let jsonString = String(data: jsonData, encoding: .utf8)
      {
        onChange(jsonString)
      }
    }
  }
}
