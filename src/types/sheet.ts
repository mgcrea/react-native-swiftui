/**
 * Shared by `SwiftUI.Sheet` and the standalone `SwiftUISheet`.
 *
 * The standalone API previously typed this as `string[]`, mirroring the nitro
 * spec's wire format rather than the values SwiftUI actually accepts — so it had
 * no autocomplete and no validation. The wire format stays `string[]`; this is
 * the JS-facing type.
 */
export type SheetDetent = "medium" | "large" | `fraction:${number}` | `height:${number}`;
