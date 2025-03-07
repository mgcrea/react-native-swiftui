import { useEffect, useId } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";
import { useJsonMemo } from "../hooks";

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
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `datePicker:${useId()}`;

  useEffect(() => {
    if (onChange)
      registerEventHandler(effectiveId, "change", (date: string) => {
        onChange(new Date(date)); // Convert string to Date
      });
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  const memoizedProps = useJsonMemo(otherProps);
  useEffect(() => {
    registerNode(
      {
        type: "DatePicker",
        id: effectiveId,
        props: memoizedProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, memoizedProps, parentId, registerNode, unregisterNode]);

  return null;
};
DatePicker.displayName = "DatePicker";
