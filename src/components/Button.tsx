import { useEffect } from "react";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../types";

export type CustomNativeButtonStyle = "subtle" | "picker";
export type NativeButtonStyle =
  | "default"
  | "plain"
  | "bordered"
  | "borderedProminent"
  | "borderless"
  | CustomNativeButtonStyle;

export type NativeButtonProps = {
  title?: string;
  disabled?: boolean;
  buttonStyle?: NativeButtonStyle;
  style?: NativeTextStyle;
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
