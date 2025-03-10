import { StyleProp, TextStyle } from "react-native";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeTextProps = {
  text: string;
  font?: "body" | "headline" | "title" | "caption";
  color?: string; // e.g., "red", "blue", hex
  alignment?: "leading" | "center" | "trailing";
  style?: StyleProp<TextStyle>;
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ ...otherProps }) => {
  useSwiftUINode("Text", otherProps);

  return null;
};
Text.displayName = "Text";
