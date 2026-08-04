/**
 * Vocabulary types shared by the declarative components (`SwiftUI.Picker`,
 * `SwiftUI.SheetPicker`) and the standalone ones (`SwiftUIPicker`,
 * `SwiftUISheetPicker`).
 *
 * These were previously declared twice — once per API — and had drifted:
 * `label` was required in one and optional in the other, and `value` was generic
 * in one and `string` in the other. Both sets were exported from the package
 * root, so consumers could reach either.
 *
 * They are deliberately unprefixed. The `Native*` prefix is kept for props types
 * (`NativePickerProps`, `NativeViewStyle`), which are genuinely per-component;
 * on a value type shared with the standalone API it only misleads.
 */

// https://developer.apple.com/documentation/swiftui/pickerstyle
export type PickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

// https://developer.apple.com/documentation/swiftui/controlsize
export type ControlSize = "mini" | "small" | "regular" | "large" | "extraLarge";

/**
 * `label` is optional: when omitted the value is displayed instead, which is what
 * the native side already does (`label ?? value`).
 */
export type PickerOption<T extends string = string> = {
  value: T;
  label?: string;
  icon?: string;
};

/**
 * Options for the sheet-presented pickers. No `icon`: the sheet list does not
 * render one.
 *
 * Lives here rather than in `SwiftUISheetPicker` because the declarative
 * `SwiftUI.SheetPicker` imports it too — which had the declarative API depending
 * on the standalone one.
 */
export type SheetPickerOption = {
  value: string;
  label?: string;
};

/** Numeric option generation, e.g. 0…100 by 5. */
export type PickerConfig = {
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};
