import type { HostComponent, ViewProps } from "react-native";
import type { DirectEventHandler, Int32 } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";
import codegenNativeCommands from "react-native/Libraries/Utilities/codegenNativeCommands";

export type NativeSwiftUIEvent = {
  name: string;
  value: string;
  type: string;
  id: string;
};

export interface NativeSwiftUIRootProps extends ViewProps {
  viewTree: string;
  onEvent?: DirectEventHandler<Readonly<NativeSwiftUIEvent>>;
}

export interface NativeSwiftUIRootCommands {
  updateChildProps: (
    viewRef: React.ElementRef<HostComponent<NativeSwiftUIRootProps>>,
    identifier: string,
    props: string,
  ) => void;
}

export const Commands = codegenNativeCommands<NativeSwiftUIRootCommands>({
  supportedCommands: ["updateChildProps"],
});

export default codegenNativeComponent<NativeSwiftUIRootProps>("NativeSwiftUIRoot", {
  excludedPlatforms: ["android"],
}) as HostComponent<NativeSwiftUIRootProps>;
