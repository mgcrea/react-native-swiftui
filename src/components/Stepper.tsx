import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIContext } from "../contexts/SwiftUIContext";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/stepper

export type NativeStepperProps = {
  value: number;
  label?: string;
  minimum?: number;
  maximum?: number;
  step?: number;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Stepper: IdentifiableFunctionComponent<NativeStepperProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
}) => {
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `auto-date-picker-${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  // Pass updated text to viewTree
  return null;
};
Stepper.displayName = "Stepper";
