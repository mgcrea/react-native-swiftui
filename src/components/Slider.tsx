import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeSliderProps = {
  value?: number;
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
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("Slider", otherProps);

  useEffect(() => {
    if (onChange) {
      registerEventHandler(id, "change", (value: string) => {
        const numValue = parseFloat(value);
        onChange(numValue);
      });
      if (onFocus) registerEventHandler(id, "focus", onFocus);
      if (onBlur) registerEventHandler(id, "blur", onBlur);
    }
  }, [id, registerEventHandler, onChange, onFocus, onBlur]);

  return null;
};
Slider.displayName = "Slider";
