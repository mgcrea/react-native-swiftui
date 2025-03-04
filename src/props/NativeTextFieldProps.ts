import { type BubblingEventHandler } from "react-native/Libraries/Types/CodegenTypes";

export type NativeKeyboardType =
  | "default"
  | "numberPad"
  | "emailAddress"
  | "decimalPad";
export type NativeTextContentType =
  | "username"
  | "password"
  | "emailAddress"
  | null;
export type NativeReturnKeyType = "default" | "done" | "next" | "search";
export type NativeAutocapitalizationType =
  | "none"
  | "words"
  | "sentences"
  | "allCharacters";

export type NativeTextFieldProps = {
  text: string;
  label?: string;
  placeholder?: string;
  keyboardType?: NativeKeyboardType;
  textContentType?: NativeTextContentType;
  returnKeyType?: NativeReturnKeyType;
  isEnabled?: boolean;
  isSecureTextEntry?: boolean;
  autocapitalizationType?: NativeAutocapitalizationType;
  maxLength?: number | null;
  multiline?: boolean;
  onChange?: BubblingEventHandler<{ value: string }>;
};
