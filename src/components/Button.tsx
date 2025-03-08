import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeButtonProps = {
  title: string;
  onPress?: () => void;
};

export const Button: FunctionComponentWithId<NativeButtonProps> = ({ onPress, ...otherProps }) => {
  const { registerEventHandler } = useSwiftUIContext();

  const { id } = useSwiftUINode("Button", otherProps);

  useEffect(() => {
    if (onPress) registerEventHandler(id, "press", onPress);
  }, [onPress, id, registerEventHandler]);

  return null;
};
Button.displayName = "Button";
