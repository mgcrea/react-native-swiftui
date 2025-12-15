import { type PropsWithChildren, useMemo } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type {
  FunctionComponentWithId,
  NativeLabelStyleProps,
  NativeTextStyle,
  NativeTextStyleProps,
} from "../../types";

// https://developer.apple.com/documentation/swiftui/stepper

export type NativeStepperProps = NativeTextStyleProps &
  NativeLabelStyleProps & {
    value?: number;
    label?: string;
    minimum?: number;
    maximum?: number;
    step?: number;
    onChange?: (value: number) => void;
    onFocus?: () => void;
    onBlur?: () => void;
  };

export const Stepper: FunctionComponentWithId<PropsWithChildren<NativeStepperProps>> = ({
  children,
  onChange: onChangeProp,
  onFocus,
  onBlur,
  style,
  labelStyle,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);
  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (value: string) => {
            onChangeProp(parseFloat(value)); // Cast string to float
          }
        : undefined,
    [onChangeProp],
  );

  const { id } = useSwiftUINode(
    "Stepper",
    { style: normalizedStyles, labelStyle: normalizedLabelStyle, ...otherProps },
    {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    },
  );

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Stepper.displayName = "Stepper";
