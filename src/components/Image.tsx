import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

export type NativeImageProps = {
  name: string;
  isSystemImage?: boolean;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
  tintColor?: string;
  style?: NativeViewStyle;
};

export const Image: FunctionComponentWithId<NativeImageProps> = ({ ...props }) => {
  useSwiftUINode("Image", props);
  return null;
};

Image.displayName = "Image";
