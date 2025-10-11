import type { ComponentRef } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import NativeSheetView, { type NativeSheetProps } from "../native/SheetViewNativeComponent";

export type SwiftUISheetProps = Omit<
  NativeSheetProps,
  "onNativeDismiss" | "onNativePrimaryAction" | "onNativeSecondaryAction"
> & {
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
      onNativeDismiss={onDismiss ?? undefined}
      onNativePrimaryAction={onPrimaryAction ?? undefined}
      onNativeSecondaryAction={onSecondaryAction ?? undefined}
      {...props}
    />
  );
});
SwiftUISheet.displayName = "SwiftUISheet";

export type { NativeSheetDetent, NativeSheetProps } from "../native/SheetViewNativeComponent";
