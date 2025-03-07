import { useEffect, useId } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/datepickerstyle
export type NativeDatePickerStyle = "automatic" | "compact" | "field" | "graphical" | "stepperField" | "wheel";

// https://developer.apple.com/documentation/swiftui/datepickercomponents
export type NativeDatePickerComponents = "date" | "hourAndMinute" | "hourMinuteAndSecond";

export type NativeDatePickerProps = {
  selection?: Date;
  label?: string;
  datePickerStyle?: NativeDatePickerStyle;
  displayedComponents?: NativeDatePickerComponents;
  disabled?: boolean;
  onChange?: (value: Date) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const DatePicker: FunctionComponentWithId<NativeDatePickerProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `datePicker:${useId()}`;

  useSwiftUINode("DatePicker", effectiveId, otherProps);

  useEffect(() => {
    if (onChange)
      registerEventHandler(effectiveId, "change", (date: string) => {
        onChange(new Date(date)); // Convert string to Date
      });
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  return null;
};
DatePicker.displayName = "DatePicker";
