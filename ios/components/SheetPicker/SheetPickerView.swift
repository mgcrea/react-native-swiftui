import SwiftUI

public struct SheetPickerView: View {
  @ObservedObject var props: SheetPickerProps

  public init(props: SheetPickerProps) {
    self.props = props
  }

  public var body: some View {
    HStack {}
      .sheet(isPresented: $props.isPresented, onDismiss: props.onDismiss) {
        if #available(iOS 16.0, *) {
          SheetPickerContentView(props: props)
            .presentationDetents([.medium, .large])
        } else {
          SheetPickerContentView(props: props)
        }
      }
  }
}

private struct SheetPickerContentView: View {
  @ObservedObject var props: SheetPickerProps

  var body: some View {
    NavigationView {
      VStack(spacing: 16) {
        if !props.title.isEmpty {
          Text(props.title)
            .font(.title2)
            .bold()
            .frame(maxWidth: .infinity, alignment: .leading)
        }

        if #available(iOS 15.0, *) {
          listView
            .searchable(text: $props.searchText, placement: .navigationBarDrawer(displayMode: .automatic), prompt: Text(props.searchPlaceholder))
        } else {
          VStack(spacing: 12) {
            TextField(props.searchPlaceholder, text: $props.searchText)
              .textFieldStyle(RoundedBorderTextFieldStyle())
            listView
          }
        }
      }
      .padding(.horizontal, 16)
      .padding(.bottom, 16)
    }
  }

  private var listView: some View {
    Group {
      if #available(iOS 16.0, *) {
        baseList
          .scrollContentBackground(.hidden)
      } else {
        baseList
      }
    }
  }

  private var baseList: some View {
    List(props.filteredOptions) { option in
      SheetPickerRow(option: option, props: props)
        .listRowInsets(EdgeInsets())
        .listRowBackground(Color.clear)
    }
    .listStyle(.plain)
    .background(Color.clear)
  }
}

private struct SheetPickerRow: View {
  let option: SheetPickerOption
  @ObservedObject var props: SheetPickerProps

  var body: some View {
    Button {
      props.select(value: option.value)
    } label: {
      HStack(spacing: 12) {
        Text(option.label)
          .foregroundColor(.primary)
          .frame(maxWidth: .infinity, alignment: .leading)

        if option.value == props.selectedValue {
          Image(systemName: "checkmark")
            .foregroundColor(.accentColor)
        } else {
          Circle()
            .strokeBorder(Color.gray.opacity(0.4), lineWidth: 1.5)
            .frame(width: 20, height: 20)
        }
      }
    }
    .buttonStyle(HighlightableRowButtonStyle(isSelected: option.value == props.selectedValue))
  }
}

private struct HighlightableRowButtonStyle: ButtonStyle {
  let isSelected: Bool

  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .padding(.vertical, 12)
      .padding(.horizontal, 8)
      .frame(maxWidth: .infinity, alignment: .leading)
      .background(backgroundColor(isPressed: configuration.isPressed))
      .cornerRadius(10)
      .contentShape(Rectangle())
  }

  private func backgroundColor(isPressed: Bool) -> Color {
    if isSelected {
      return Color.accentColor.opacity(0.12)
    }
    return isPressed ? Color.gray.opacity(0.15) : Color.clear
  }
}
