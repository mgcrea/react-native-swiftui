import { useMemo } from "react";

import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { NativeLabelStyleProps, NativeTextStyle, SheetPickerOption, WithId } from "../../types";

export type NativeSheetPickerOptionInput = SheetPickerOption | string;

export type NativeSheetPickerProps = WithId<
  NativeLabelStyleProps & {
    label?: string;
    selectedValue?: string;
    options?: readonly NativeSheetPickerOptionInput[];
    title?: string;
    searchPlaceholder?: string;
    placeholder?: string;
    autoDismiss?: boolean;
    disabled?: boolean;
    isPresented?: boolean;
  }
>;

export type NativeSheetPickerEvents = {
  onChange?: (value: string) => void;
  onDismiss?: () => void;
};

export type SheetPickerProps = NativeSheetPickerProps & NativeSheetPickerEvents;

const DEFAULT_PLACEHOLDER = "Select an option";

export const SheetPicker = ({
  selectedValue,
  options,
  label,
  title,
  searchPlaceholder,
  placeholder,
  autoDismiss,
  disabled,
  isPresented,
  onChange,
  onDismiss,
  labelStyle,
  ...otherProps
}: SheetPickerProps) => {
  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);
  const normalizedOptions = useMemo(() => {
    if (!options || options.length === 0) {
      return [];
    }
    return options.map((option) => {
      if (typeof option === "string") {
        return { label: option, value: option };
      }
      return {
        label: option.label ?? option.value,
        value: option.value,
      };
    });
  }, [options]);

  useSwiftUINode(
    "SheetPicker",
    {
      ...otherProps,
      label,
      labelStyle: normalizedLabelStyle,
      title: title ?? label ?? "",
      selectedValue,
      options: normalizedOptions,
      searchPlaceholder,
      placeholder: placeholder ?? DEFAULT_PLACEHOLDER,
      autoDismiss,
      disabled,
      isPresented,
      displayMode: "embedded",
    },
    {
      change: onChange,
      dismiss: onDismiss,
    },
  );

  return null;
};

SheetPicker.displayName = "SheetPicker";
