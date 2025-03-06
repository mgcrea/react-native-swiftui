import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/datepickerstyle
export type NativePickerStyle = "automatic" | "compact" | "field" | "graphical" | "stepperField" | "wheel";

// https://developer.apple.com/documentation/swiftui/datepickercomponents
export type NativeDatePickerComponents = "date" | "hourAndMinute" | "hourMinuteAndSecond";

export type NativeDatePickerProps = {
  selection?: Date;
  label?: string;
  datePickerStyle?: NativePickerStyle;
  displayedComponents?: NativeDatePickerComponents;
  disabled?: boolean;
  onChange?: (value: Date) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const DatePicker: IdentifiableFunctionComponent<NativeDatePickerProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `datePicker:${useId()}`;

  useEffect(() => {
    if (onChange)
      registerEventHandler(effectiveId, "change", (date: string) => {
        console.log({ date });
        onChange(new Date(date));
      });
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  useEffect(() => {
    registerNode(
      {
        type: "DatePicker",
        id: effectiveId,
        props: otherProps,
      },
      parentId,
    );
  }, [effectiveId, otherProps, parentId, registerNode]);

  return null;
};
DatePicker.displayName = "DatePicker";
