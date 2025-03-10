import { useMemo } from "react";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeToggleProps = {
  isOn: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle: FunctionComponentWithId<NativeToggleProps> = ({
  onChange: onChangeProp,
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

  useSwiftUINode("Toggle", otherProps, {
    change: onChange,
  });

  return null;
};
Toggle.displayName = "Toggle";
