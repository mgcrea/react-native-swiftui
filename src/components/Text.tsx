import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeTextProps = {
  text: string;
  font?: "body" | "headline" | "title" | "caption";
  color?: string; // e.g., "red", "blue", hex
  alignment?: "leading" | "center" | "trailing";
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ ...otherProps }) => {
  useSwiftUINode("Text", otherProps);

  return null;
};
Text.displayName = "Text";
