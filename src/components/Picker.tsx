import { useEffect, useId } from "react";
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
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `picker:${useId()}`;

  useSwiftUINode("Picker", effectiveId, otherProps);

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  return null;
};
Picker.displayName = "Picker";
