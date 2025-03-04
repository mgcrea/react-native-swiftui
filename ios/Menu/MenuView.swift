import SwiftUI
import UIKit

// MARK: - Props

// struct NativePickerViewProps {
//   var selection: String = ""
//   var options: [String] = []
//   var pickerStyle: String = "wheel"
// }

// extension NativePickerViewProps {
//   init(dictionary: [String: Any]) {
//     selection = dictionary["selection"] as? String ?? ""
//     options = dictionary["options"] as? [String] ?? []
//     pickerStyle = dictionary["pickerStyle"] as? String ?? "wheel"
//   }
// }

struct MenuOrderModifier: ViewModifier {
  func body(content: Content) -> some View {
    if #available(iOS 16.0, *) {
      content.menuOrder(.fixed)
    } else {
      content
    }
  }
}

extension View {
  func applyMenuOrder() -> some View {
    modifier(MenuOrderModifier())
  }
}

// MARK: - SwiftUI Picker

public struct SwiftUIMenu: View {
  @ObservedObject var props: MenuProps

  public var body: some View {
    Group {
      Menu {
        ForEach(props.options, id: \.self) { option in
          Button {
            props.selection = option
          } label: {
            if option == props.selection {
              Label(option, systemImage: "checkmark")
            } else {
              Text(option)
            }
          }
        }
      } label: {
        // Customizable select button appearance
        HStack {
          Text(props.selection)
          Image(systemName: "chevron.down")
        }
        .padding()
        .background(RoundedRectangle(cornerRadius: 8).fill(Color.blue))
        .foregroundColor(.white)
      }
      .applyMenuOrder()
    }
  }
}

// struct CustomMenuPicker: View {
//   @ObservedObject var props: PickerProps
//   @State private var selectedOption: String = "Select Option"
//   let options = ["Option 1", "Option 2", "Option 3"]

//   var body: some View {
//     Menu {
//       ForEach(options, id: \.self) { option in
//         Button {
//           selectedOption = option
//         } label: {
//           Text(option)
//         }
//       }
//     } label: {
//       HStack {
//         Text(selectedOption)
//           .foregroundColor(selectedOption == "Select Option" ? .gray : .primary)
//         Spacer()
//         Image(systemName: "chevron.down")
//           .foregroundColor(.gray)
//       }
//       .padding()
//       .background(
//         RoundedRectangle(cornerRadius: 8)
//           .stroke(Color.gray, lineWidth: 1)
//       )
//     }
//     .padding()
//   }
// }

// MARK: - PickerView Container

@objc(MenuView)
public class MenuView: SwiftUIContainerView {
  private let props: MenuProps

  @objc
  public init(frame _: CGRect) {
    props = MenuProps()
    super.init(rootView: AnyView(SwiftUIMenu(props: props)))
  }

  @objc
  public func updateProps(with newDictionary: [String: Any], oldDictionary _: [String: Any]) {
    props.update(with: newDictionary)
  }
}

// https://github.com/expo/expo/tree/main/packages/expo-modules-core/ios/Core/Events
