import SwiftUI

public struct ImageView: View {
  @ObservedObject public var props: ImageProps

  public var body: some View {
    let image: Image
    if let sourceUri = props.sourceUri, // Check for URI-based image first
       let url = URL(string: sourceUri),
       let data = try? Data(contentsOf: url),
       let uiImage = UIImage(data: data)
    {
      image = Image(uiImage: uiImage) // Load from URI
    } else if let name = props.name { // Fall back to named image
      if name.hasPrefix("system:") {
        let systemName = String(name.dropFirst("system:".count))
        image = Image(systemName: systemName) // Load system image
      } else {
        image = Image(name) // Load named asset
      }
    } else {
      return AnyView(Text("No image source provided")) // Fallback if neither is set
    }
    // let tintedImage = props.tintColor != nil ? image.foregroundColor(Color(hex: props.tintColor!)) : image
    return AnyView(props.resizeMode.applyResizeMode(image).applyStyles(props.style))
  }
}
