import SwiftUI

public struct TextView: View {
  @ObservedObject public var props: TextProps

  public var body: some View {
    Text(verbatim: props.text)
      .multilineTextAlignment(props.alignment)
      .applyStyles(props.style)
  }
}
