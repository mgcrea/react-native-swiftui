import SwiftUI

public struct TextView: View {
  @ObservedObject public var props: TextProps

  public var body: some View {
    Text(verbatim: props.text)
//      .font(props.font)
//      .foregroundColor(props.color)
      .multilineTextAlignment(props.alignment)
      .applyStyles(props.style)
  }
}
