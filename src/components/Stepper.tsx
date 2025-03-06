import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIParentContext, useSwiftUIContext } from "../contexts";
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
  ...otherProps
}) => {
  const { registerEventHandler, registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `stepper:${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  registerNode(
    {
      type: "Stepper",
      id: effectiveId,
      props: otherProps,
    },
    parentId,
  );

  return null;
};
Stepper.displayName = "Stepper";
