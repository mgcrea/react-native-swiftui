import { type PropsWithChildren } from "react";
import { type StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../hooks";
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
  style?: StyleProp<NativeTextStyle>;
  onPress?: () => void;
};

export const Button: FunctionComponentWithId<PropsWithChildren<NativeButtonProps>> = ({
  title,
  children,
  onPress,
  style,
  ...otherProps
}) => {
  const normalizedTitle = title ?? undefined;
  const normalizedStyle = useNormalizedStyles<NativeTextStyle>(style);

  const { id } = useSwiftUINode(
    "Button",
    { title: normalizedTitle, style: normalizedStyle, ...otherProps },
    { press: onPress },
  );

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Button.displayName = "Button";
