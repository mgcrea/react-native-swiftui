import { useMemo } from "react";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../types";
import { NativeKeyboardType, NativeReturnKeyType } from "./TextField";

export type NumberFormatter =
  | "currency"
  | "decimal"
  | "percent"
  | "scientific"
  | "spellOut"
  | "ordinal"
  | "currencyISOCode"
  | "currencyPlural"
  | "currencyAccounting";

export type NativeNumberFieldProps<T = number> = {
  value?: T;
  label?: string;
  placeholder?: string;
  keyboardType?: NativeKeyboardType;
  returnKeyType?: NativeReturnKeyType;
  min?: number | null;
  max?: number | null;
  disabled?: boolean;
  style?: NativeTextStyle;
  formatter?: NumberFormatter;
  onChange?: (value: T) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const NumberField: FunctionComponentWithId<NativeNumberFieldProps> = ({
  onChange: onChangeProp,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (date: string) => {
            onChangeProp(parseFloat(date)); // Convert string to number
          }
        : undefined,
    [onChangeProp],
  );

  useSwiftUINode("NumberField", otherProps, { change: onChange, focus: onFocus, blur: onBlur });

  return null;
};
NumberField.displayName = "NumberField";
