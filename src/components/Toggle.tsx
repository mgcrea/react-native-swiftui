import { useEffect, useId } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeToggleProps = {
  isOn: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle: FunctionComponentWithId<NativeToggleProps> = ({ id, onChange, ...otherProps }) => {
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `toggle:${useId()}`;

  useSwiftUINode("Toggle", effectiveId, otherProps);

  useEffect(() => {
    if (onChange) {
      registerEventHandler(effectiveId, "change", (value: string) => {
        console.log(`value: ${value}, type of value: ${typeof value}`);
        onChange(value === "true"); // Convert string to boolean
      });
    }
  }, [onChange, effectiveId, registerEventHandler]);

  return null;
};
Toggle.displayName = "Toggle";
