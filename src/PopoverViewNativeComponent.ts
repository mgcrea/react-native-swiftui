import type { HostComponent, ViewProps } from "react-native";
import type {
  BubblingEventHandler,
  WithDefault,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

type NativePopoverChangeEvent = {
  value: string;
};

export interface NativePopoverProps extends ViewProps {
  selection: string;
  options: string[];
  onChange?: BubblingEventHandler<NativePopoverChangeEvent> | null;
}

export default codegenNativeComponent<NativePopoverProps>(
  "NativePopoverView"
) as HostComponent<NativePopoverProps>;
