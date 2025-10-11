import { Image as BaseImage, type ImageSourcePropType } from "react-native";
import { useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../../types";

export type NativeImageProps = {
  name?: string;
  source?: ImageSourcePropType;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
  tintColor?: string;
  style?: NativeTextStyle;
};

export const Image: FunctionComponentWithId<NativeImageProps> = ({ source, ...props }) => {
  const sourceUri = source ? BaseImage.resolveAssetSource(source).uri : undefined;
  useSwiftUINode("Image", { sourceUri, ...props });
  return null;
};

Image.displayName = "Image";
