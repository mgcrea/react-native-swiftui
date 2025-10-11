import SwiftUI
import UIKit

public struct SheetPickerView: View {
  @ObservedObject var props: SheetPickerProps

  public init(props: SheetPickerProps) {
    self.props = props
  }

  public var body: some View {
    triggerView
      .sheet(isPresented: $props.isPresented, onDismiss: props.onDismiss) {
        if #available(iOS 16.0, *) {
          SheetPickerContentView(props: props)
            .presentationDetents([.medium, .large])
        } else {
          SheetPickerContentView(props: props)
        }
      }
  }

  @ViewBuilder
  private var triggerView: some View {
    switch props.displayMode {
    case .embedded:
      embeddedTrigger
    case .standalone:
      Color.clear
        .frame(width: 0, height: 0)
        .accessibilityHidden(true)
    }
  }

  private var embeddedTrigger: some View {
    Button {
      guard !props.disabled else { return }
      props.isPresented = true
    } label: {
      embeddedLabel
        .frame(maxWidth: .infinity, alignment: .leading)
        .contentShape(Rectangle())
    }
    .buttonStyle(.plain)
    .disabled(props.disabled)
  }

  @ViewBuilder
  private var embeddedLabel: some View {
    if props.label.isEmpty {
      selectionLabel
        .frame(maxWidth: .infinity, alignment: .leading)
    } else if #available(iOS 16.0, *) {
      LabeledContent {
        selectionLabel
      } label: {
        Text(props.label)
      }
    } else {
      HStack(alignment: .firstTextBaseline, spacing: 8) {
        Text(props.label)
          .foregroundColor(.primary)
        Spacer()
        selectionLabel
      }
      .padding(.vertical, 4)
    }
  }

  private var selectionLabel: some View {
    HStack(spacing: 6) {
      Text(props.resolvedSelectedLabel)
        .foregroundColor(props.hasSelection ? .accentColor : Color(.placeholderText))
      Image(systemName: "chevron.up.chevron.down")
        .font(.footnote)
        .foregroundColor(props.hasSelection ? .accentColor : Color(.placeholderText))
    }
  }
}

private struct SheetPickerContentView: View {
  @ObservedObject var props: SheetPickerProps

  var body: some View {
    NavigationView {
      VStack(spacing: 16) {
        if !headerTitle.isEmpty {
          Text(headerTitle)
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

  private var headerTitle: String {
    let candidate = props.title.isEmpty ? props.label : props.title
    return candidate
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
