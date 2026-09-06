import { parseNumberOrNull } from "../../hooks";
import type { NativeLabelStyleProps, NativeTextStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";
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

export const NumberField = createNodeComponent<NativeNumberFieldProps, number | null>("NumberField", {
  parse: parseNumberOrNull,
});
