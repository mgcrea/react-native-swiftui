import { useId, useEffect, cloneElement } from "react";
import type { IdentifiableFunctionComponent } from "src/types";
import { useSwiftUIParentContext, useSwiftUIContext } from "../contexts";

export type NativeKeyboardType = "default" | "numberPad" | "emailAddress" | "decimalPad";

export type NativeTextContentType = "username" | "password" | "emailAddress" | null;
export type NativeReturnKeyType = "default" | "done" | "next" | "search";

export type NativeAutocapitalizationType = "none" | "words" | "sentences" | "allCharacters";

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
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextField: IdentifiableFunctionComponent<NativeTextFieldProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `textfield:${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  registerNode(
    {
      type: "TextField",
      id: effectiveId,
      props: otherProps,
    },
    parentId,
  );

  return null;
};
TextField.displayName = "TextField";
