import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIContext } from "../contexts/SwiftUIContext";
import type { IdentifiableFunctionComponent } from "src/types";

export type NativePickerStyle =
  | "default"
  | "inline"
  | "menu"
  | "segmented"
  | "wheel";

export type NativePickerProps = {
  selection?: string;
  label?: string;
  options?: string[];
  pickerStyle?: NativePickerStyle;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Picker: IdentifiableFunctionComponent<NativePickerProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
}) => {
  console.log("Picker");
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `auto-picker-${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  // Pass updated text to viewTree
  return null;
};
Picker.displayName = "Picker";
