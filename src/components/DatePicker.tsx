import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIContext } from "../contexts/SwiftUIContext";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/datepickercomponents
export type NativeDatePickerComponents =
  | "date"
  | "hourAndMinute"
  | "hourMinuteAndSecond";

export type NativeDatePickerProps = {
  selection?: Date;
  label?: string;
  displayedComponents?: NativeDatePickerComponents;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const DatePicker: IdentifiableFunctionComponent<
  NativeDatePickerProps
> = ({ id, onChange, onFocus, onBlur }) => {
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `auto-date-picker-${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  // Pass updated text to viewTree
  return null;
};
DatePicker.displayName = "DatePicker";
