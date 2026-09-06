import { forwardRef, type ComponentRef } from "react";
import type { ViewProps } from "react-native";
import { getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import SheetViewConfig from "../../nitrogen/generated/shared/json/SheetViewConfig.json";
import { usePresentableHandle, type PresentableHandle } from "../hooks";
import type { SheetViewMethods, SheetViewProps } from "../specs/SheetView.nitro";
import type { SheetDetent } from "../types";
import { useNativeCallback } from "../utils";

const NativeSheetView = getHostComponent<SheetViewProps, SheetViewMethods>(
  "SheetView",
  () => SheetViewConfig as ViewConfig<SheetViewProps>,
);

export type SwiftUISheetProps = ViewProps & {
  isPresented?: boolean;
  detents?: SheetDetent[];
  title?: string;
  message?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onDismiss?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

export type SwiftUISheetHandle = PresentableHandle;

export const SwiftUISheet = forwardRef<SwiftUISheetHandle, SwiftUISheetProps>(function SwiftUISheetComponent(
  { isPresented = false, onDismiss, onPrimaryAction, onSecondaryAction, ...props },
  ref,
) {
  const nativeRef = usePresentableHandle<ComponentRef<typeof NativeSheetView>>(ref);
  const onNativeDismiss = useNativeCallback(onDismiss);
  const onNativePrimaryAction = useNativeCallback(onPrimaryAction);
  const onNativeSecondaryAction = useNativeCallback(onSecondaryAction);

  return (
    <NativeSheetView
      ref={nativeRef}
      isPresented={isPresented}
      onNativeDismiss={onNativeDismiss}
      onNativePrimaryAction={onNativePrimaryAction}
      onNativeSecondaryAction={onNativeSecondaryAction}
      {...props}
    />
  );
});

SwiftUISheet.displayName = "SwiftUISheet";
