import type { HostComponent, ViewProps } from "react-native";
import type { DirectEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

type NativePickerChangeEvent = {
  value: string;
};
type NativePickerFocusEvent = {};
type NativePickerBlurEvent = {};

export interface NativePickerProps extends ViewProps {
  selection?: string;
  label?: string;
  options?: string[];
  pickerStyle?: WithDefault<NativePickerStyle, "default">;
  disabled?: boolean;
  onChange?: DirectEventHandler<Readonly<NativePickerChangeEvent>>;
  onFocus?: DirectEventHandler<Readonly<NativePickerFocusEvent>>;
  onBlur?: DirectEventHandler<Readonly<NativePickerBlurEvent>>;
}

export default codegenNativeComponent<NativePickerProps>(
  "NativePickerView",
) as HostComponent<NativePickerProps>;
