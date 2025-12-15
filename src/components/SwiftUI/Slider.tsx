import { PropsWithChildren, useMemo } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useDebounce, useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeLabelStyleProps, NativeTextStyle } from "../../types";

export type NativeSliderProps = NativeLabelStyleProps & {
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
  labelStyle,
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
  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);

  const { id } = useSwiftUINode(
    "Slider",
    { value: debouncedValue, labelStyle: normalizedLabelStyle, ...otherProps },
    {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    },
  );

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Slider.displayName = "Slider";
