import { type PropsWithChildren, useMemo } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/stepper

export type NativeStepperProps = {
  value?: number;
  label?: string;
  minimum?: number;
  maximum?: number;
  step?: number;
  style?: NativeTextStyle;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Stepper: FunctionComponentWithId<PropsWithChildren<NativeStepperProps>> = ({
  children,
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

  const { id } = useSwiftUINode("Stepper", otherProps, {
    change: onChange,
    focus: onFocus,
    blur: onBlur,
  });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Stepper.displayName = "Stepper";
