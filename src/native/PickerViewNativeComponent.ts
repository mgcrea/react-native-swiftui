/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";
import type { DirectEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

type NativePickerChangeEvent = {
  value: string;
};
type NativePickerFocusEvent = {};
type NativePickerBlurEvent = {};

export interface NativePickerProps extends ViewProps {
  selection?: string;
  label?: string;
  labelColor?: string;
  options?: string[];
  pickerStyle?: WithDefault<NativePickerStyle, "default">;
  disabled?: boolean;
  onNativeChange?: DirectEventHandler<Readonly<NativePickerChangeEvent>>;
  onNativeFocus?: DirectEventHandler<Readonly<NativePickerFocusEvent>>;
  onNativeBlur?: DirectEventHandler<Readonly<NativePickerBlurEvent>>;
}

export default codegenNativeComponent<NativePickerProps>(
  "NativePickerView",
) as HostComponent<NativePickerProps>;
