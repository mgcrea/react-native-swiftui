/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { CodegenTypes } from "react-native";
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";

export type NativeSheetPickerOption = Readonly<{
  label?: string;
  value: string;
}>;

export type NativeSheetPickerSelectEvent = Readonly<{
  value: string;
}>;

export type NativeSheetPickerDismissEvent = {};

export interface NativeSheetPickerProps extends ViewProps {
  isPresented?: CodegenTypes.WithDefault<boolean, false>;
  title?: string;
  searchPlaceholder?: string;
  selectedValue?: string;
  options?: readonly NativeSheetPickerOption[];
  autoDismiss?: CodegenTypes.WithDefault<boolean, true>;
  onNativeSelect?: CodegenTypes.DirectEventHandler<NativeSheetPickerSelectEvent>;
  onNativeDismiss?: CodegenTypes.DirectEventHandler<Readonly<NativeSheetPickerDismissEvent>>;
}

export default codegenNativeComponent<NativeSheetPickerProps>(
  "NativeSheetPickerView",
) as HostComponent<NativeSheetPickerProps>;
