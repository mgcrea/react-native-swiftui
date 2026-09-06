/** An option as callers may write it: a bare value, or an object with an optional label. */
export type OptionInput<T extends string = string> = T | { value: T; label?: string; icon?: string };

export type NormalizedOption<T extends string = string> = { value: T; label: string; icon?: string };

/**
 * One normalizer for Picker, MultiPicker and SheetPicker.
 *
 * Each had its own copy and they had drifted: MultiPicker decided the shape of
 * the whole array from element 0, and Picker passed options through untouched —
 * but the Swift `PickerOption` decodes `label` as *required*, so a single
 * `{ value }` option failed the whole tree decode.
 */
export const normalizeOptions = <T extends string>(
  options: readonly OptionInput<T>[] | undefined,
): NormalizedOption<T>[] => {
  if (!options) {
    return [];
  }
  return options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option.icon === undefined
        ? { value: option.value, label: option.label ?? option.value }
        : { value: option.value, label: option.label ?? option.value, icon: option.icon },
  );
};
