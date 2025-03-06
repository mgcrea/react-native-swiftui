import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/datepickercomponents
export type NativeDatePickerComponents = "date" | "hourAndMinute" | "hourMinuteAndSecond";

export type NativeDatePickerProps = {
  selection?: Date;
  label?: string;
  displayedComponents?: NativeDatePickerComponents;
  onChange?: (value: string) => void;
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
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  registerNode(
    {
      type: "DatePicker",
      id: effectiveId,
      props: otherProps,
    },
    parentId,
  );

  // Pass updated text to viewTree
  return null;
};
DatePicker.displayName = "DatePicker";
