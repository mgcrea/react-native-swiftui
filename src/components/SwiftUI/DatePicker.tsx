import { useMemo } from "react";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeLabelStyleProps, NativeTextStyle } from "../../types";

// https://developer.apple.com/documentation/swiftui/datepickerstyle
export type NativeDatePickerStyle = "automatic" | "compact" | "field" | "graphical" | "stepperField" | "wheel";

// https://developer.apple.com/documentation/swiftui/datepickercomponents
export type NativeDatePickerComponents = "date" | "hourAndMinute" | "hourMinuteAndSecond";
export type NativeDatePickerComponentsAliases = "date" | "time" | "datetime";

export type NativeDatePickerProps = NativeLabelStyleProps & {
  selection?: Date;
  label?: string;
  datePickerStyle?: NativeDatePickerStyle;
  displayedComponents?: NativeDatePickerComponents[] | NativeDatePickerComponentsAliases;
  disabled?: boolean;
  onChange?: (value: Date) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const DatePicker: FunctionComponentWithId<NativeDatePickerProps> = ({
  onChange: onChangeProp,
  onFocus,
  onBlur,
  labelStyle,
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

  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);

  useSwiftUINode(
    "DatePicker",
    { labelStyle: normalizedLabelStyle, ...otherProps },
    { change: onChange, focus: onFocus, blur: onBlur },
  );
  return null;
};
DatePicker.displayName = "DatePicker";
