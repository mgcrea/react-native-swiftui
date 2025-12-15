import { useMemo } from "react";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeLabelStyleProps, NativeTextStyle } from "../../types";

export type NativeToggleProps = NativeLabelStyleProps & {
  isOn: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle: FunctionComponentWithId<NativeToggleProps> = ({
  onChange: onChangeProp,
  labelStyle,
  ...otherProps
}) => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (value: string) => {
            onChangeProp(value === "true"); // Cast string to boolean
          }
        : undefined,
    [onChangeProp],
  );

  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);

  useSwiftUINode(
    "Toggle",
    { labelStyle: normalizedLabelStyle, ...otherProps },
    {
      change: onChange,
    },
  );

  return null;
};
Toggle.displayName = "Toggle";
