import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/picker

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

export type NativePickerProps = {
  selection?: string;
  label?: string;
  options?: string[];
  pickerStyle?: NativePickerStyle;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Picker: FunctionComponentWithId<NativePickerProps> = ({
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("Picker", otherProps);

  useEffect(() => {
    if (onChange) registerEventHandler(id, "change", onChange);
    if (onFocus) registerEventHandler(id, "focus", onFocus);
    if (onBlur) registerEventHandler(id, "blur", onBlur);
  }, [id, registerEventHandler, onChange, onFocus, onBlur]);

  return null;
};
Picker.displayName = "Picker";
