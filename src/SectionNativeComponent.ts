import type { HostComponent, ViewProps } from "react-native";
import { WithDefault } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export type NativeSectionListStyle =
  | "inset"
  | "insetGrouped"
  | "plain"
  | "grouped";

export interface NativeSectionProps extends ViewProps {
  header?: string;
  footer?: string;
  listStyle?: WithDefault<NativeSectionListStyle, "inset">;
}

export default codegenNativeComponent<NativeSectionProps>(
  "NativeSectionView"
) as HostComponent<NativeSectionProps>;
