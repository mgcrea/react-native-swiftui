---
title: Migrating to 0.18
description: Breaking changes in 0.18.0 and how to update
---

`0.18.0` unifies types that were declared twice — once for the declarative
components (`SwiftUI.Picker`) and once for the standalone ones (`SwiftUIPicker`).
Both sets were exported from the package root, and they had drifted apart, so the
same concept had two names and two slightly different shapes.

All changes are TypeScript-level. No native or runtime behaviour changed, and no
`pod install` is required.

## Renamed types

The shared vocabulary types lost their `Native` prefix. The prefix is still used
for per-component props types (`NativePickerProps`, `NativeViewStyle`), which are
genuinely distinct per API — it only misled on values shared with the standalone
components.

| Before | After |
| --- | --- |
| `NativePickerStyle`, `PickerStyle` | `PickerStyle` |
| `NativeControlSize`, `ControlSize` | `ControlSize` |
| `NativePickerOption<T>`, `PickerOption` | `PickerOption<T>` |
| `NativePickerConfig` | `PickerConfig` |
| `NativeSheetDetent` | `SheetDetent` |

```ts
// Before
import type { NativePickerOption, NativePickerStyle } from '@mgcrea/react-native-swiftui';

// After
import type { PickerOption, PickerStyle } from '@mgcrea/react-native-swiftui';
```

`PickerOption` is now generic with a default, so `PickerOption` and
`PickerOption<'a' | 'b'>` both work.

## `label` is now optional on `PickerOption`

It was required in the declarative API and optional in the standalone one. It is
optional everywhere now, matching what the native side already did — when
omitted, the value is displayed instead. Existing code that always passed a label
keeps working.

## `SwiftUISheetPicker`: `onSelect` is now `onChange`

Every other component in the library uses `onChange`; `SwiftUISheetPicker` was
the exception.

```tsx
// Before
<SwiftUISheetPicker options={options} onSelect={setValue} />

// After
<SwiftUISheetPicker options={options} onChange={setValue} />
```

## `SwiftUISheet`: `detents` is now typed

`detents` was `string[]`, which mirrored the wire format rather than the values
SwiftUI accepts, so it offered no autocomplete and no validation. It is now
`SheetDetent[]`:

```ts
type SheetDetent = 'medium' | 'large' | `fraction:${number}` | `height:${number}`;
```

Existing valid values still compile. Anything else was never going to work at
runtime and is now a type error.

## Option arrays accept `readonly`

`SwiftUIPicker` and `SwiftUISheetPicker` previously required a mutable array, so
an `as const` option list was rejected there while being accepted by the
declarative components. Both now take `readonly`.

## Removed

`Simplify<T>` was exported from the root but used nowhere, including internally.
