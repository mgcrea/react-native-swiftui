import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeKeyboardType = "default" | "numberPad" | "emailAddress" | "decimalPad";
export type NativeTextContentType = "username" | "password" | "emailAddress";
export type NativeReturnKeyType = "default" | "done" | "next" | "search";
export type NativeAutocapitalizationType = "none" | "words" | "sentences" | "allCharacters";

export type NativeTextFieldProps = {
  text?: string;
  label?: string;
  placeholder?: string;
  keyboardType?: NativeKeyboardType;
  textContentType?: NativeTextContentType;
  returnKeyType?: NativeReturnKeyType;
  secure?: boolean;
  autocapitalizationType?: NativeAutocapitalizationType;
  maxLength?: number | null;
  multiline?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextField: FunctionComponentWithId<NativeTextFieldProps> = ({
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("TextField", otherProps);

  useEffect(() => {
    if (onChange) registerEventHandler(id, "change", onChange);
    if (onFocus) registerEventHandler(id, "focus", onFocus);
    if (onBlur) registerEventHandler(id, "blur", onBlur);
  }, [onChange, onFocus, onBlur, id, registerEventHandler]);

  return null;
};
TextField.displayName = "TextField";
