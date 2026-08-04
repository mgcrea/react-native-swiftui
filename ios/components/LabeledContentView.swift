import SwiftUI

/// The `LabeledContent` block plus its pre-iOS-16 `HStack` fallback, in one place.
///
/// This was copy-pasted across nine component views — four of them literal
/// clones — and the copies had drifted in ways that were visible to users:
///
/// * MultiPicker and SheetPicker used `LabeledContent(_ titleKey:)`, the string
///   initializer, so they had no label closure and could not apply `labelStyle`
///   at all while their six siblings could.
/// * The fallback laid out three different ways (bare `HStack`, `Spacer()`-
///   separated, `firstTextBaseline` plus padding), so identical JS produced
///   different label layouts on iOS 15 depending on which component you used.
///
/// The fallback keeps the `Spacer()` because that is what matches `LabeledContent`
/// on iOS 16+, where the content is trailing-aligned. The four clones that omitted
/// it were the ones rendering differently across the version boundary.
struct LabeledContentView<Content: View>: View {
  let label: String
  var labelStyle: StyleProps?
  /// Only affects the pre-iOS-16 fallback; `LabeledContent` handles its own.
  var alignment: VerticalAlignment = .firstTextBaseline
  var spacing: CGFloat?
  var fallbackPadding: CGFloat?
  @ViewBuilder let content: () -> Content

  var body: some View {
    if label.isEmpty {
      content()
    } else if #available(iOS 16.0, *) {
      LabeledContent {
        content()
      } label: {
        Text(label)
          .applyStyles(labelStyle)
      }
    } else {
      HStack(alignment: alignment, spacing: spacing) {
        Text(label)
          .applyStyles(labelStyle)
        Spacer()
        content()
      }
      .applyIf(fallbackPadding != nil) { $0.padding(.vertical, fallbackPadding!) }
    }
  }
}
