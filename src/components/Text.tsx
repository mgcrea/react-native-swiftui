import { useId } from "react";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeTextProps = {
  text: string;
  font?: "body" | "headline" | "title" | "caption";
  color?: string; // e.g., "red", "blue", hex
  alignment?: "leading" | "center" | "trailing";
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ id, ...otherProps }) => {
  const effectiveId = id || `text:${useId()}`;

  useSwiftUINode("Text", effectiveId, otherProps);

  return null;
};
Text.displayName = "Text";
