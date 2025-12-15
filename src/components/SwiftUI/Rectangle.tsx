import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle, NativeViewStyleProps } from "../../types";

// https://developer.apple.com/documentation/swiftui/rectangle

export type NativeRectangleProps = NativeViewStyleProps & {};

export const Rectangle: FunctionComponentWithId<NativeRectangleProps> = ({ style, ...props }) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  useSwiftUINode("Rectangle", { style: normalizedStyles, ...props });
  return null;
};
Rectangle.displayName = "Rectangle";
