// `./components/SwiftUI` is ambiguous: both `components/SwiftUI.tsx` and
// `components/SwiftUI/index.ts` exist, and the *file* wins. That is the intended
// target — it exports the `SwiftUI` namespace component — but it holds only by
// resolution order, so renaming either would silently flip which is public.
//
// The extension cannot be spelled out to disambiguate: Babel copies the
// specifier through verbatim, emitting `require("./components/SwiftUI.tsx")`
// against a built `SwiftUI.js`, which throws on import.
export * from "./components/SwiftUI";
export * from "./components/SFSymbol";
export * from "./components/SwiftUIPicker";
export * from "./components/SwiftUISheet";
export * from "./components/SwiftUISheetPicker";

export * from "./styles";

// Sub-components are reached through the `SwiftUI.*` namespace (`SwiftUI.Picker`),
// so only their prop types are public here.
export type * from "./components/SwiftUI/index";
export type * from "./types";

// `contexts`, `hooks` and `utils` stay internal: `<SwiftUI>` wires the providers
// itself, so there is nothing a consumer needs to compose by hand. This is a
// deliberate boundary, not an oversight — it was previously three commented-out
// export lines, which read like the latter.
