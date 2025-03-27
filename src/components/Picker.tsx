import { ReactNode, useMemo } from "react";
import { StyleProp, StyleSheet } from "react-native";
import { useSwiftUINode } from "../hooks";
import type { NativeTextStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/picker

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

export type NativePickerProps<T extends string> = {
  options: readonly { value: T; label: string }[] | readonly T[];
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
  options,
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

  const normalizedOptions = useMemo(
    () =>
      options.length > 0 && typeof options[0] === "string"
        ? options.map((value) => ({ value, label: value }))
        : options,
    [options],
  );

  const normalizedStyles = useMemo(() => (Array.isArray(style) ? StyleSheet.flatten(style) : style), [style]);

  useSwiftUINode(
    "Picker",
    { options: normalizedOptions, style: normalizedStyles, ...otherProps },
    {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    },
  );
  return null;
};
Picker.displayName = "Picker";
