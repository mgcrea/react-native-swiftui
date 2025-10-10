import { ReactNode, useMemo } from "react";
import { StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../hooks";
import type { NativeTextStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/picker

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

export type NativePickerOption<T extends string> = { value: T; label: string } | T;

export type NativePickerConfig = {
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};

const DEFAULT_PICKER_CONFIG = {
  min: 0,
  max: 100,
  step: 1,
  prefix: "",
  suffix: "",
} satisfies NativePickerConfig;

export type NativePickerProps<T extends string> = {
  options?: readonly NativePickerOption<T>[];
  config?: NativePickerConfig;
  selection?: T;
  label?: string;
  pickerStyle?: NativePickerStyle;
  disabled?: boolean;
  style?: StyleProp<NativeTextStyle>;
  onChange?: (value: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Picker = <T extends string>({
  selection,
  options,
  config,
  onChange: onChangeProp,
  onFocus,
  onBlur,
  style,
  ...otherProps
}: NativePickerProps<T>): ReactNode => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (value: string) => {
            onChangeProp(value as T); // Cast string to T
          }
        : undefined,
    [onChangeProp],
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
  const normalizedSelection = selection ? String(selection) : undefined;
  const normalizedConfig = useMemo(
    () =>
      config
        ? {
            ...DEFAULT_PICKER_CONFIG,
            ...config,
          }
        : undefined,
    [config],
  );
  const normalizedOptions = useMemo(
    () =>
      options
        ? options.length > 0 && typeof options[0] === "string"
          ? options.map((value) => ({ value, label: value }))
          : options
        : [],
    [options],
  );

  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);

  useSwiftUINode(
    "Picker",
    {
      selection: normalizedSelection,
      options: normalizedOptions,
      config: normalizedConfig,
      style: normalizedStyles,
      ...otherProps,
    },
    {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    },
  );
  return null;
};
Picker.displayName = "Picker";
