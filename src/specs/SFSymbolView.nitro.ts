/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { HybridView, HybridViewMethods, HybridViewProps } from "react-native-nitro-modules";

export interface SFSymbolViewProps extends HybridViewProps {
  symbolName: string;
  size?: number;
  textStyle?: string;
  weight?: string;
  scale?: string;
  renderingMode?: string;
  variableValue?: number;
  colors?: string[];
}

export interface SFSymbolViewMethods extends HybridViewMethods {}

export type SFSymbolView = HybridView<SFSymbolViewProps, SFSymbolViewMethods, { ios: "swift" }>;
