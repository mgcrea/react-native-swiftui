import SwiftUI

// MARK: - View

public struct DatePickerView: View {
  @ObservedObject public var props: DatePickerProps

  public init(props: DatePickerProps) {
    self.props = props
  }

  public var body: some View {
    DatePicker(props.label,
               selection: $props.selection,
               displayedComponents: props.displayedComponents)
      .datePickerStyle(.compact)
      .onChange(of: props.selection) { newValue in
        print("DatePicker value changed: \(newValue)")
        props.onChange?(newValue)
      }
  }
}
