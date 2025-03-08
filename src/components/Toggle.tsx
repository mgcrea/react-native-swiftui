import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeToggleProps = {
  isOn: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle: FunctionComponentWithId<NativeToggleProps> = ({ onChange, ...otherProps }) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("Toggle", otherProps);

  useEffect(() => {
    if (onChange) {
      registerEventHandler(id, "change", (value: string) => {
        console.log(`value: ${value}, type of value: ${typeof value}`);
        onChange(value === "true"); // Convert string to boolean
      });
    }
  }, [id, registerEventHandler, onChange]);

  return null;
};
Toggle.displayName = "Toggle";
