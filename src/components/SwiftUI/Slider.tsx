import { PropsWithChildren, useMemo } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useDebounce, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId } from "../../types";

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

export const Slider: FunctionComponentWithId<PropsWithChildren<NativeSliderProps>> = ({
  children,
  onChange: onChangeProp,
  onFocus,
  onBlur,
  value,
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

  const debouncedValue = useDebounce(value, 100);

  const { id } = useSwiftUINode(
    "Slider",
    { value: debouncedValue, ...otherProps },
    {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    },
  );

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Slider.displayName = "Slider";
