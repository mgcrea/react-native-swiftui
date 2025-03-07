import { useEffect, useId } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";

export type NativeKeyboardType = "default" | "numberPad" | "emailAddress" | "decimalPad";
export type NativeTextContentType = "username" | "password" | "emailAddress";
export type NativeReturnKeyType = "default" | "done" | "next" | "search";
export type NativeAutocapitalizationType = "none" | "words" | "sentences" | "allCharacters";

export type NativeTextFieldProps = {
  text: string;
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
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `textField:${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  useEffect(() => {
    registerNode(
      {
        type: "TextField",
        id: effectiveId,
        props: otherProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, otherProps, parentId, registerNode, unregisterNode]);

  return null;
};
TextField.displayName = "TextField";
