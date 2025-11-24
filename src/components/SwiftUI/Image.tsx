import { Image as BaseImage, type ImageSourcePropType, type StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeTextStyle } from "../../types";

export type NativeImageProps = {
  name?: string;
  source?: ImageSourcePropType;
  resizeMode?: "cover" | "contain" | "stretch" | "center";
  tintColor?: string;
  style?: StyleProp<NativeTextStyle>;
};

export const Image: FunctionComponentWithId<NativeImageProps> = ({ source, style, ...props }) => {
  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);
  const sourceUri = source ? BaseImage.resolveAssetSource(source).uri : undefined;
  useSwiftUINode("Image", { sourceUri, style: normalizedStyles, ...props });
  return null;
};

Image.displayName = "Image";
