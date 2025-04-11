import SwiftUI

// MARK: - View

public struct MultiPickerView: View {
  @ObservedObject var props: MultiPickerProps

  public init(props: MultiPickerProps, onSelectionsChanged _: ((String) -> Void)? = nil) {
    self.props = props
  }

  public var body: some View {
    if props.label.isEmpty {
      multiPickerContent()
    } else {
      if #available(iOS 16.0, *) {
        LabeledContent(props.label) {
          multiPickerContent()
        }
      } else {
        HStack {
          Text(props.label)
          multiPickerContent()
        }
      }
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
          ForEach(0 ..< props.components.count, id: \.self) { index in
            let component = props.components[index]
            ZStack(alignment: Alignment(horizontal: .trailing, vertical: .center)) {
              if !component.label.isEmpty && !component.computedOptions.isEmpty {
                Text(component.label)
                  .padding(.trailing, 16)
                  .font(.caption)
              }
              Picker(component.label, selection: $props.selections[index]) {
                ForEach(component.computedOptions, id: \.value) { option in
                  Text(option.label).tag(option.value)
                }
              }
              .onChange(of: props.selections[index]) { _ in
                notifySelectionsChanged()
              }
              .pickerStyle(.wheel)
              .frame(width: geometry.size.width / CGFloat(props.components.count))
              .clipped()
            }
          }
        }
      }
    }.applyStyles(props.style)
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
