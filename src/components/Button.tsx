import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

export type NativeButtonStyle = "default" | "plain" | "bordered" | "borderedProminent" | "borderless";

export type NativeButtonProps = {
  title?: string;
  disabled?: boolean;
  buttonStyle?: NativeButtonStyle;
  style?: NativeViewStyle;
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
