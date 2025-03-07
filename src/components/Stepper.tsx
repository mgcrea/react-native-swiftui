import { useId, useEffect } from "react";
import { useSwiftUIParentContext, useSwiftUIContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";
import { useJsonMemo } from "../hooks";

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
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `stepper:${useId()}`;

  useEffect(() => {
    if (onChange)
      registerEventHandler(effectiveId, "change", (value: string) => {
        onChange(Number(value)); // Convert string to number
      });
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  const memoizedProps = useJsonMemo(otherProps);
  useEffect(() => {
    registerNode(
      {
        type: "Stepper",
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
Stepper.displayName = "Stepper";
