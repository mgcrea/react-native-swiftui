import { useNormalizedStyles, useSwiftUINode, useParsedEvent, parseBoolean } from "../../hooks";
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
  const onChange = useParsedEvent(parseBoolean, onChangeProp);

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
