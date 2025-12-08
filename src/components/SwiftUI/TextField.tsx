import { type StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../../types";

export type NativeKeyboardType = "default" | "numberPad" | "emailAddress" | "decimalPad";
export type NativeTextContentType = "username" | "password" | "emailAddress";
export type NativeReturnKeyType = "default" | "done" | "next" | "search";
export type NativeAutocapitalizationType = "none" | "words" | "sentences" | "allCharacters";
export type NativeSubmitLabel =
  | "continue"
  | "done"
  | "go"
  | "join"
  | "next"
  | "return"
  | "route"
  | "search"
  | "send";

export type NativeTextFieldProps<T = string> = {
  text?: T;
  label?: string;
  placeholder?: string;
  keyboardType?: NativeKeyboardType;
  textContentType?: NativeTextContentType;
  returnKeyType?: NativeReturnKeyType;
  secure?: boolean;
  autocapitalizationType?: NativeAutocapitalizationType;
  submitLabel?: NativeSubmitLabel;
  maxLength?: number | null;
  multiline?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  style?: StyleProp<NativeTextStyle>;
  onChange?: (value: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextField: FunctionComponentWithId<NativeTextFieldProps> = ({
  onChange,
  onFocus,
  onBlur,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);
  useSwiftUINode("TextField", { style: normalizedStyles, ...otherProps }, { change: onChange, focus: onFocus, blur: onBlur });

  return null;
};
TextField.displayName = "TextField";
