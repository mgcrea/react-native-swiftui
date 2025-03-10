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
  useSwiftUINode("Button", otherProps, { press: onPress });
  return null;
};
Button.displayName = "Button";
