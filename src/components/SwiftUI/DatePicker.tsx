import { parseDate } from "../../hooks";
import type { NativeLabelStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/datepickerstyle
export type NativeDatePickerStyle = "default" | "compact" | "field" | "graphical" | "stepperField" | "wheel";

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

export const DatePicker = createNodeComponent<NativeDatePickerProps, Date>("DatePicker", { parse: parseDate });
