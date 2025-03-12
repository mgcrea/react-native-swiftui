import SwiftUI

public struct SpacerView: View {
  @ObservedObject public var props: SpacerProps

  public var body: some View {
    Spacer(minLength: props.minLength)
  }
}
