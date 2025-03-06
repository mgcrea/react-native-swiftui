import type { HostComponent, ViewProps } from "react-native";
import type { BubblingEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

type NativePickerChangeEvent = {
  value: string;
};

export type NativePickerStyle = "wheel" | "menu" | "segmented";

export interface NativePickerProps extends ViewProps {
  label?: string;
  selection?: string;
  options: string[];
  pickerStyle?: WithDefault<NativePickerStyle, "wheel">;
  onChange?: BubblingEventHandler<Readonly<NativePickerChangeEvent>>;
}

export default codegenNativeComponent<NativePickerProps>(
  "NativePickerView",
) as HostComponent<NativePickerProps>;
