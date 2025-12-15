import { useMemo } from "react";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type {
  FunctionComponentWithId,
  NativeLabelStyleProps,
  NativeTextStyle,
  NativeTextStyleProps,
} from "../../types";
import type { NativeKeyboardType, NativeReturnKeyType } from "./TextField";

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

export type NativeNumberFieldProps<T = number> = NativeTextStyleProps &
  NativeLabelStyleProps & {
    value?: T | null;
    label?: string;
    placeholder?: string;
    keyboardType?: NativeKeyboardType;
    returnKeyType?: NativeReturnKeyType;
    min?: number | null;
    max?: number | null;
    disabled?: boolean;
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
  labelStyle,
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
  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);

  useSwiftUINode(
    "NumberField",
    { style: normalizedStyle, labelStyle: normalizedLabelStyle, ...otherProps },
    { change: onChange, focus: onFocus, blur: onBlur },
  );

  return null;
};
NumberField.displayName = "NumberField";
