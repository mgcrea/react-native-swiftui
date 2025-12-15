import type { CodegenTypes } from "react-native";
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";

export type NativeSFSymbolWeight =
  | "ultraLight"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy"
  | "black";

export type NativeSFSymbolScale = "small" | "medium" | "large";

export type NativeSFSymbolRenderingMode = "monochrome" | "hierarchical" | "palette" | "multicolor";

export type NativeSFSymbolResizeMode = "contain" | "cover" | "stretch" | "center";

export type NativeSFSymbolTextStyle =
  | "largeTitle"
  | "title"
  | "title2"
  | "title3"
  | "headline"
  | "subheadline"
  | "body"
  | "callout"
  | "footnote"
  | "caption"
  | "caption2";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface NativeSFSymbolProps extends ViewProps {
  name: string;
  size?: CodegenTypes.Double;
  textStyle?: CodegenTypes.WithDefault<NativeSFSymbolTextStyle, "body">;
  weight?: CodegenTypes.WithDefault<NativeSFSymbolWeight, "regular">;
  scale?: CodegenTypes.WithDefault<NativeSFSymbolScale, "medium">;
  renderingMode?: CodegenTypes.WithDefault<NativeSFSymbolRenderingMode, "monochrome">;
  resizeMode?: CodegenTypes.WithDefault<NativeSFSymbolResizeMode, "contain">;
  variableValue?: CodegenTypes.Double;
  colors?: readonly string[];
}

export default codegenNativeComponent<NativeSFSymbolProps>("NativeSFSymbolView", {
  interfaceOnly: false,
}) as HostComponent<NativeSFSymbolProps>;
