import { useEffect, useId } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

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
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `slider:${useId()}`;

  useSwiftUINode("Slider", effectiveId, otherProps);

  useEffect(() => {
    if (onChange) {
      registerEventHandler(effectiveId, "change", (value: string) => {
        const numValue = parseFloat(value);
        onChange(numValue);
      });
      if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
      if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
    }
  }, [onChange, effectiveId, registerEventHandler]);

  return null;
};
Slider.displayName = "Slider";
