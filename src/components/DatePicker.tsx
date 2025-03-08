import { useEffect } from "react";
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
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("DatePicker", otherProps);

  useEffect(() => {
    if (onChange)
      registerEventHandler(id, "change", (date: string) => {
        onChange(new Date(date)); // Convert string to Date
      });
    if (onFocus) registerEventHandler(id, "focus", onFocus);
    if (onBlur) registerEventHandler(id, "blur", onBlur);
  }, [onChange, onFocus, onBlur, id, registerEventHandler]);

  return null;
};
DatePicker.displayName = "DatePicker";
