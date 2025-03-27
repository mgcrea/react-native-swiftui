import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../types";

export type NativeKeyboardType = "default" | "numberPad" | "emailAddress" | "decimalPad";
export type NativeTextContentType = "username" | "password" | "emailAddress";
export type NativeReturnKeyType = "default" | "done" | "next" | "search";
export type NativeAutocapitalizationType = "none" | "words" | "sentences" | "allCharacters";

export type NativeTextFieldProps<T = string> = {
  text?: T;
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
  style?: NativeTextStyle;
  onChange?: (value: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextField: FunctionComponentWithId<NativeTextFieldProps> = ({
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  useSwiftUINode("TextField", otherProps, { change: onChange, focus: onFocus, blur: onBlur });

  return null;
};
TextField.displayName = "TextField";
