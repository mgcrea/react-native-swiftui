import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeTextStyle, NativeTextStyleProps } from "../../types";

export type NativeTextProps = NativeTextStyleProps & {
  text: string;
  alignment?: "leading" | "center" | "trailing";
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ style, ...otherProps }) => {
  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);
  useSwiftUINode("Text", { style: normalizedStyles, ...otherProps });

  return null;
};
Text.displayName = "Text";
