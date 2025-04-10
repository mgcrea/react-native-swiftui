import { type StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../types";

export type NativeTextProps = {
  text: string;
  alignment?: "leading" | "center" | "trailing";
  style?: StyleProp<NativeTextStyle>;
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ style, ...otherProps }) => {
  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);
  useSwiftUINode("Text", { style: normalizedStyles, ...otherProps });

  return null;
};
Text.displayName = "Text";
