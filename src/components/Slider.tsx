import { useId, useEffect } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";
import { useDebugEffect, useJsonMemo } from "../hooks";

export type NativeSliderProps = {
  value: number;
  minimum?: number;
  maximum?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Slider: FunctionComponentWithId<NativeSliderProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `slider:${useId()}`;

  useEffect(() => {
    if (onChange) {
      registerEventHandler(effectiveId, "change", (value: string) => {
        const numValue = parseFloat(value);
        console.log({ value, numValue });
        onChange(numValue);
      });
      if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
      if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
    }
  }, [onChange, effectiveId, registerEventHandler]);

  const memoizedProps = useJsonMemo(otherProps);
  useEffect(() => {
    registerNode(
      {
        type: "Slider",
        id: effectiveId,
        props: memoizedProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, memoizedProps, parentId, registerNode, unregisterNode]);
  useDebugEffect({ memoizedProps, parentId, registerNode, unregisterNode });

  return null;
};
Slider.displayName = "Slider";
