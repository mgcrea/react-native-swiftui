import { useEffect, useId } from "react";
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
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const effectiveId = id || `stepper:${useId()}`;

  useSwiftUINode("Stepper", effectiveId, otherProps);

  useEffect(() => {
    if (onChange)
      registerEventHandler(effectiveId, "change", (value: string) => {
        onChange(Number(value)); // Convert string to number
      });
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  return null;
};
Stepper.displayName = "Stepper";
