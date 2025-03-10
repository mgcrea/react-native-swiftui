import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../types";

export type NativeTextProps = {
  text: string;
  alignment?: "leading" | "center" | "trailing";
  style?: NativeTextStyle;
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ ...otherProps }) => {
  useSwiftUINode("Text", otherProps);

  return null;
};
Text.displayName = "Text";
