import { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeStyleProps = {
  backgroundColor?: string;
  foregroundColor?: string;
  padding?: number;
  border?: { color?: string; width?: number };
};

export type NativeButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
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
