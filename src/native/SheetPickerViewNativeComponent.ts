/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";
import type { DirectEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type NativeSheetPickerOption = Readonly<{
  label?: string;
  value: string;
}>;

export type NativeSheetPickerSelectEvent = Readonly<{
  value: string;
}>;

export type NativeSheetPickerDismissEvent = {};

export interface NativeSheetPickerProps extends ViewProps {
  isPresented?: WithDefault<boolean, false>;
  title?: string;
  searchPlaceholder?: string;
  selectedValue?: string;
  options?: readonly NativeSheetPickerOption[];
  autoDismiss?: WithDefault<boolean, true>;
  onNativeSelect?: DirectEventHandler<NativeSheetPickerSelectEvent>;
  onNativeDismiss?: DirectEventHandler<Readonly<NativeSheetPickerDismissEvent>>;
}

export default codegenNativeComponent<NativeSheetPickerProps>(
  "NativeSheetPickerView",
) as HostComponent<NativeSheetPickerProps>;
