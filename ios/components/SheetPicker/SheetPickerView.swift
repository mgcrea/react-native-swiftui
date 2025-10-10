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
    List(props.filteredOptions) { option in
      SheetPickerRow(option: option, props: props)
        .listRowInsets(EdgeInsets())
        .listRowBackground(Color.clear)
    }
    .listStyle(.plain)
    .cornerRadius(12)
    // .scrollContentBackground(.hidden)
  }
}

private struct SheetPickerRow: View {
  let option: SheetPickerOption
  @ObservedObject var props: SheetPickerProps
  @State private var isPressed = false

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
      .padding(.vertical, 10)
      .padding(.horizontal, 8)
      .background(rowBackgroundColor)
      .cornerRadius(10)
      .contentShape(Rectangle())
    }
    .buttonStyle(.plain)
    .onChange(of: props.selectedValue) { _ in
      isPressed = false
    }
    .pressAction {
      isPressed = true
    } onRelease: {
      isPressed = false
    }
  }

  private var rowBackgroundColor: Color {
    if option.value == props.selectedValue {
      return Color.accentColor.opacity(0.12)
    }
    return isPressed ? Color.gray.opacity(0.15) : Color.clear
  }
}

private extension View {
  func pressAction(onPress: @escaping () -> Void, onRelease: @escaping () -> Void) -> some View {
    modifier(PressActionModifier(onPress: onPress, onRelease: onRelease))
  }
}

private struct PressActionModifier: ViewModifier {
  let onPress: () -> Void
  let onRelease: () -> Void

  @State private var isPressed = false

  func body(content: Content) -> some View {
    content
      .simultaneousGesture(DragGesture(minimumDistance: 0)
        .onChanged { _ in
          if !isPressed {
            isPressed = true
            onPress()
          }
        }
        .onEnded { _ in
          isPressed = false
          onRelease()
        })
  }
}
