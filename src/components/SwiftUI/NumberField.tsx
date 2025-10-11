import { useMemo } from "react";
import { StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../../types";
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
  value?: T | null;
  label?: string;
  placeholder?: string;
  keyboardType?: NativeKeyboardType;
  returnKeyType?: NativeReturnKeyType;
  min?: number | null;
  max?: number | null;
  disabled?: boolean;
  style?: StyleProp<NativeTextStyle>;
  formatter?: NumberFormatter;
  onChange?: (value: T | null) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const NumberField: FunctionComponentWithId<NativeNumberFieldProps> = ({
  onChange: onChangeProp,
  onFocus,
  onBlur,
  style,
  ...otherProps
}) => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (date: string) => {
            const parsedFloat = parseFloat(date);
            onChangeProp(!isNaN(parsedFloat) ? parsedFloat : null); // Convert string to number
          }
        : undefined,
    [onChangeProp],
  );

  const normalizedStyle = useNormalizedStyles<NativeTextStyle>(style);

  useSwiftUINode(
    "NumberField",
    { style: normalizedStyle, ...otherProps },
    { change: onChange, focus: onFocus, blur: onBlur },
  );

  return null;
};
NumberField.displayName = "NumberField";
