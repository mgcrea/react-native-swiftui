import { ReactNode, useMemo } from "react";
import { useSwiftUINode } from "../hooks";

// https://developer.apple.com/documentation/swiftui/picker

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

export type NativePickerProps<T extends string> = {
  options: T[];
  selection?: string;
  label?: string;
  pickerStyle?: NativePickerStyle;
  disabled?: boolean;
  onChange?: (value: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Picker = <T extends string>({
  onChange: onChangeProp,
  onFocus,
  onBlur,
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

  useSwiftUINode("Picker", otherProps, {
    change: onChange,
    focus: onFocus,
    blur: onBlur,
  });
  return null;
};
Picker.displayName = "Picker";
