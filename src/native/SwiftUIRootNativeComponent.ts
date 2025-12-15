/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-deprecated */
import type { CodegenTypes } from "react-native";
import {
  codegenNativeCommands,
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from "react-native";

export type NativeSwiftUIEvent = {
  name: string;
  value: string;
  type: string;
  id: string;
};

export interface NativeSwiftUIRootProps extends ViewProps {
  viewTree?: string;
  onEvent?: CodegenTypes.DirectEventHandler<Readonly<NativeSwiftUIEvent>>;
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
