import { ReactNode, useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
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
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}: NativePickerProps<T>): ReactNode => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("Picker", otherProps);

  useEffect(() => {
    if (onChange)
      registerEventHandler(id, "change", (value: string) => {
        onChange(value as T);
      });
    if (onFocus) registerEventHandler(id, "focus", onFocus);
    if (onBlur) registerEventHandler(id, "blur", onBlur);
  }, [id, registerEventHandler, onChange, onFocus, onBlur]);

  return null;
};
Picker.displayName = "Picker";
