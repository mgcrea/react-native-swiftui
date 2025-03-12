import SwiftUI

public struct RectangleView: View {
  @ObservedObject public var props: RectangleProps

  public var body: some View {
    Rectangle()
      .applyShapeStyles(props.style)
  }
}
