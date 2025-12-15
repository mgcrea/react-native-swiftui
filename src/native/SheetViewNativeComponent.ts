/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { CodegenTypes } from "react-native";
import { codegenNativeComponent, type HostComponent, type ViewProps } from "react-native";

export type NativeSheetDetent = string;

type NativeSheetDismissEvent = {};
type NativeSheetPrimaryActionEvent = {};
type NativeSheetSecondaryActionEvent = {};

export interface NativeSheetProps extends ViewProps {
  isPresented?: CodegenTypes.WithDefault<boolean, false>;
  detents?: NativeSheetDetent[];
  title?: string;
  message?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onNativeDismiss?: CodegenTypes.DirectEventHandler<Readonly<NativeSheetDismissEvent>>;
  onNativePrimaryAction?: CodegenTypes.DirectEventHandler<Readonly<NativeSheetPrimaryActionEvent>>;
  onNativeSecondaryAction?: CodegenTypes.DirectEventHandler<Readonly<NativeSheetSecondaryActionEvent>>;
}

export default codegenNativeComponent<NativeSheetProps>("NativeSheetView") as HostComponent<NativeSheetProps>;
