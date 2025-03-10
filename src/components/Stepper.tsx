import { useMemo } from "react";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/stepper

export type NativeStepperProps = {
  value?: number;
  label?: string;
  minimum?: number;
  maximum?: number;
  step?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Stepper: FunctionComponentWithId<NativeStepperProps> = ({
  onChange: onChangeProp,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (value: string) => {
            onChangeProp(parseFloat(value)); // Cast string to float
          }
        : undefined,
    [onChangeProp],
  );

  useSwiftUINode("Stepper", otherProps, {
    change: onChange,
    focus: onFocus,
    blur: onBlur,
  });

  return null;
};
Stepper.displayName = "Stepper";
