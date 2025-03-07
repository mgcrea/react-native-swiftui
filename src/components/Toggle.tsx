import { useEffect, useId } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";

export type NativeToggleProps = {
  isOn: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle: FunctionComponentWithId<NativeToggleProps> = ({ id, onChange, ...otherProps }) => {
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `toggle:${useId()}`;

  useEffect(() => {
    if (onChange) {
      registerEventHandler(effectiveId, "change", (value: string) => {
        console.log(`value: ${value}, type of value: ${typeof value}`);
        onChange(value === "true"); // Convert string to boolean
      });
    }
  }, [onChange, effectiveId, registerEventHandler]);

  useEffect(() => {
    registerNode(
      {
        type: "Toggle",
        id: effectiveId,
        props: otherProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, otherProps, parentId, registerNode, unregisterNode]);

  return null;
};
Toggle.displayName = "Toggle";
