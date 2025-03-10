import { useMemo } from "react";
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

  useSwiftUINode("Slider", otherProps, {
    change: onChange,
    focus: onFocus,
    blur: onBlur,
  });

  return null;
};
Slider.displayName = "Slider";
