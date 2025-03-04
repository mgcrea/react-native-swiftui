import type { HostComponent, ViewProps } from "react-native";
import type {
  BubblingEventHandler,
  WithDefault,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

type NativeMenuChangeEvent = {
  value: string;
};

export interface NativeMenuProps extends ViewProps {
  selection: string;
  options: string[];
  onChange?: BubblingEventHandler<NativeMenuChangeEvent> | null;
}

export default codegenNativeComponent<NativeMenuProps>(
  "NativeMenuView"
) as HostComponent<NativeMenuProps>;
