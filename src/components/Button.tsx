import { useEffect, useId } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeButtonProps = {
  title: string;
  onPress?: () => void;
};

export const Button: FunctionComponentWithId<NativeButtonProps> = ({ id, onPress, ...otherProps }) => {
  const { registerEventHandler } = useSwiftUIContext();
  const effectiveId = id || `button:${useId()}`;

  useSwiftUINode("Button", effectiveId, otherProps);

  useEffect(() => {
    if (onPress) registerEventHandler(effectiveId, "press", onPress);
  }, [onPress, effectiveId, registerEventHandler]);

  return null;
};
Button.displayName = "Button";
