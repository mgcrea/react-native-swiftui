/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { CodegenTypes } from "react-native";
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";

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
  pickerStyle?: CodegenTypes.WithDefault<NativePickerStyle, "default">;
  disabled?: boolean;
  onNativeChange?: CodegenTypes.DirectEventHandler<Readonly<NativePickerChangeEvent>>;
  onNativeFocus?: CodegenTypes.DirectEventHandler<Readonly<NativePickerFocusEvent>>;
  onNativeBlur?: CodegenTypes.DirectEventHandler<Readonly<NativePickerBlurEvent>>;
}

export default codegenNativeComponent<NativePickerProps>(
  "NativePickerView",
) as HostComponent<NativePickerProps>;
