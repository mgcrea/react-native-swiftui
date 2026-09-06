import SwiftUI

extension View {
  /// `.disabled` plus the grey-out the text inputs share.
  func disabledStyle(_ disabled: Bool) -> some View {
    self.disabled(disabled).foregroundStyle(disabled ? .gray : .primary)
  }

  /// A "Done" button above the keyboard while `isFocused` is set. TextField and
  /// NumberField carried this toolbar block verbatim.
  func keyboardDoneToolbar(isFocused: FocusState<Bool>.Binding) -> some View {
    toolbar {
      ToolbarItemGroup(placement: .keyboard) {
        if isFocused.wrappedValue {
          Spacer()
          Button("Done") {
            isFocused.wrappedValue = false
          }
        }
      }
    }
  }
}
