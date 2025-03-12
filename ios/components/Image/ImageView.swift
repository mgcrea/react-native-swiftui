import SwiftUI

public struct ImageView: View {
  @ObservedObject public var props: ImageProps

  public var body: some View {
    let baseImage = props.isSystemImage ? Image(systemName: props.name) : Image(props.name)
    // let tintedImage = props.tintColor != nil ? image.foregroundColor(Color(hex: props.tintColor!)) : image
    return props.resizeMode.applyResizeMode(baseImage).foregroundStyle(Color.red).applyStyles(props.style)
  }
}
