import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/stepper

export type NativeStepperProps = {
  value: number;
  label?: string;
  minimum?: number;
  maximum?: number;
  step?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Stepper: FunctionComponentWithId<NativeStepperProps> = ({
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("Stepper", otherProps);

  useEffect(() => {
    if (onChange)
      registerEventHandler(id, "change", (value: string) => {
        const numValue = parseFloat(value);
        onChange(numValue);
      });
    if (onFocus) registerEventHandler(id, "focus", onFocus);
    if (onBlur) registerEventHandler(id, "blur", onBlur);
  }, [onChange, onFocus, onBlur, id, registerEventHandler]);

  return null;
};
Stepper.displayName = "Stepper";
