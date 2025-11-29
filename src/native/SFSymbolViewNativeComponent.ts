import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";
import type { Double, WithDefault } from "react-native/Libraries/Types/CodegenTypes";

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
  size?: Double;
  textStyle?: WithDefault<NativeSFSymbolTextStyle, "body">;
  weight?: WithDefault<NativeSFSymbolWeight, "regular">;
  scale?: WithDefault<NativeSFSymbolScale, "medium">;
  renderingMode?: WithDefault<NativeSFSymbolRenderingMode, "monochrome">;
  resizeMode?: WithDefault<NativeSFSymbolResizeMode, "contain">;
  variableValue?: Double;
  colors?: readonly string[];
}

export default codegenNativeComponent<NativeSFSymbolProps>("NativeSFSymbolView", {
  interfaceOnly: false,
}) as HostComponent<NativeSFSymbolProps>;
