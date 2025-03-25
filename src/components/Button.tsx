import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
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

export const Button: FunctionComponentWithId<PropsWithChildren<NativeButtonProps>> = ({
  children,
  onPress,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Button", otherProps, { press: onPress });
  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Button.displayName = "Button";
