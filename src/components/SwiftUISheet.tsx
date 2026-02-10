import { forwardRef, useImperativeHandle, useRef, type ComponentRef } from "react";
import type { ViewProps } from "react-native";
import { callback, getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import SheetViewConfig from "../../nitrogen/generated/shared/json/SheetViewConfig.json";
import type { SheetViewMethods, SheetViewProps } from "../specs/SheetView.nitro";

const NativeSheetView = getHostComponent<SheetViewProps, SheetViewMethods>(
  "SheetView",
  () => SheetViewConfig as ViewConfig<SheetViewProps>,
);

export type SwiftUISheetProps = ViewProps & {
  isPresented?: boolean;
  detents?: string[];
  title?: string;
  message?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onDismiss?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

export type SwiftUISheetHandle = {
  present: () => void;
  dismiss: () => void;
};

export const SwiftUISheet = forwardRef<SwiftUISheetHandle, SwiftUISheetProps>(function SwiftUISheetComponent(
  { isPresented = false, onDismiss, onPrimaryAction, onSecondaryAction, ...props },
  ref,
) {
  const nativeRef = useRef<ComponentRef<typeof NativeSheetView>>(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      nativeRef.current?.setNativeProps({ isPresented: true });
    },
    dismiss: () => {
      nativeRef.current?.setNativeProps({ isPresented: false });
    },
  }));

  return (
    <NativeSheetView
      ref={nativeRef}
      isPresented={isPresented}
      onNativeDismiss={onDismiss ? callback(onDismiss) : undefined}
      onNativePrimaryAction={onPrimaryAction ? callback(onPrimaryAction) : undefined}
      onNativeSecondaryAction={onSecondaryAction ? callback(onSecondaryAction) : undefined}
      {...props}
    />
  );
});

SwiftUISheet.displayName = "SwiftUISheet";
