import type { HostComponent, ViewProps } from "react-native";
import type { BubblingEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export type NativeSwiftUIEvent = {
  name: string;
  value: string;
  type: string;
  id: string;
};

export interface NativeSwiftUIRootViewProps extends ViewProps {
  viewTree: string;
  onEvent?: BubblingEventHandler<Readonly<NativeSwiftUIEvent>>;
}

export default codegenNativeComponent<NativeSwiftUIRootViewProps>(
  "NativeSwiftUIRootView",
) as HostComponent<NativeSwiftUIRootViewProps>;
