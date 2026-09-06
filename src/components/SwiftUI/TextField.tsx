import type { NativeLabelStyleProps, NativeTextStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

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

export type NativeTextFieldProps<T = string> = NativeTextStyleProps &
  NativeLabelStyleProps & {
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
    onChange?: (value: T) => void;
    onFocus?: () => void;
    onBlur?: () => void;
  };

export const TextField = createNodeComponent<NativeTextFieldProps>("TextField");
