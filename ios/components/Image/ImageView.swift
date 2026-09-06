import SwiftUI

public struct ImageView: View {
  @ObservedObject public var props: ImageProps

  public var body: some View {
    if let sourceUri = props.sourceUri, let url = URL(string: sourceUri) {
      // Use AsyncImage for URL-based images to avoid blocking the main thread
      AsyncImage(url: url) { phase in
        switch phase {
        case .empty:
          ProgressView()
            .applyStyles(props.style)
        case let .success(image):
          styled(image)
        case .failure:
          Image(systemName: "exclamationmark.triangle")
            .applyStyles(props.style)
        @unknown default:
          EmptyView()
        }
      }
    } else if let name = props.name {
      // Named images (system or asset) can be loaded synchronously
      if name.hasPrefix("system:") {
        styled(Image(systemName: String(name.dropFirst("system:".count))))
      } else {
        styled(Image(name))
      }
    } else {
      Text("No image source provided")
    }
  }

  /// `tintColor` was decoded and merged but never applied. A tint only takes
  /// effect on a template image, so the rendering mode is switched with it.
  @ViewBuilder
  private func styled(_ image: Image) -> some View {
    if let tint = props.tintColor, let color = Color(fromCSSName: tint) {
      props.resizeMode
        .applyResizeMode(image.renderingMode(.template))
        .foregroundColor(color)
        .applyStyles(props.style)
    } else {
      props.resizeMode
        .applyResizeMode(image)
        .applyStyles(props.style)
    }
  }
}
