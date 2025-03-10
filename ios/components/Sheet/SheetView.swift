import SwiftUI

public struct SheetView<Content: View>: View {
    @ObservedObject public var props: SheetProps
    let content: () -> Content

    public init(props: SheetProps, @ViewBuilder content: @escaping () -> Content) {
        self.props = props
        self.content = content
    }

    public var body: some View {
        HStack {}
            .sheet(isPresented: $props.isPresented, onDismiss: props.onDismiss) {
                content() // Use the provided content inside the sheet
                    .applyDetents(props.detents)
            }
    }
}

// Extension to apply detents conditionally for iOS 16+
private extension View {
    @ViewBuilder
    func applyDetents(_ detents: [String]) -> some View {
        if #available(iOS 16.0, *) {
            self.presentationDetents(Set(detents.compactMap { detent in
                switch detent.lowercased() {
                case "medium": return .medium
                case "large": return .large
                case let str where str.hasPrefix("fraction:"):
                    let value = Double(str.replacingOccurrences(of: "fraction:", with: "")) ?? 0.5
                    return .fraction(value)
                case let str where str.hasPrefix("height:"):
                    let value = CGFloat(Double(str.replacingOccurrences(of: "height:", with: "")) ?? 300)
                    return .height(value)
                default: return .medium
                }
            }))
        } else {
            self // No detents for earlier iOS versions
        }
    }
}
