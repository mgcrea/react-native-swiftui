import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/rectangle

export type NativeRectangleProps = {
  style?: NativeViewStyle;
};

export const Rectangle: FunctionComponentWithId<NativeRectangleProps> = ({ ...props }) => {
  useSwiftUINode("Rectangle", props);
  return null;
};
Rectangle.displayName = "Rectangle";
