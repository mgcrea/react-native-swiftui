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
          props.resizeMode.applyResizeMode(image)
            .applyStyles(props.style)
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
        let systemName = String(name.dropFirst("system:".count))
        props.resizeMode
          .applyResizeMode(Image(systemName: systemName))
          .applyStyles(props.style)
      } else {
        props.resizeMode
          .applyResizeMode(Image(name))
          .applyStyles(props.style)
      }
    } else {
      Text("No image source provided")
    }
  }
}
