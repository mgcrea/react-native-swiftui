/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";
import type { DirectEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type NativeSheetDetent = string;

type NativeSheetDismissEvent = {};
type NativeSheetPrimaryActionEvent = {};
type NativeSheetSecondaryActionEvent = {};

export interface NativeSheetProps extends ViewProps {
  isPresented?: WithDefault<boolean, false>;
  detents?: NativeSheetDetent[];
  title?: string;
  message?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onNativeDismiss?: DirectEventHandler<Readonly<NativeSheetDismissEvent>>;
  onNativePrimaryAction?: DirectEventHandler<Readonly<NativeSheetPrimaryActionEvent>>;
  onNativeSecondaryAction?: DirectEventHandler<Readonly<NativeSheetSecondaryActionEvent>>;
}

export default codegenNativeComponent<NativeSheetProps>("NativeSheetView") as HostComponent<NativeSheetProps>;
