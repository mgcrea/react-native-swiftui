import { useMemo } from "react";
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
  onChange: onChangeProp,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (date: string) => {
            let parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
              parsedDate = new Date();
            }
            onChangeProp(parsedDate);
          }
        : undefined,
    [onChangeProp],
  );

  useSwiftUINode("DatePicker", otherProps, { change: onChange, focus: onFocus, blur: onBlur });
  return null;
};
DatePicker.displayName = "DatePicker";
