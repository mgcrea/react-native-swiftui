import type { ComponentRef, PropsWithChildren } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import NativeSheetView, { type NativeSheetProps } from "../native/SheetViewNativeComponent";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/view/sheet

export type SheetProps = PropsWithChildren<NativeSheetProps> & {
  isPresented?: boolean;
  onDismiss?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

export const Sheet: FunctionComponentWithId<SheetProps> = ({
  children,
  onDismiss,
  onPrimaryAction,
  onSecondaryAction,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Sheet", otherProps, {
    dismiss: onDismiss,
    primaryAction: onPrimaryAction,
    secondaryAction: onSecondaryAction,
  });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Sheet.displayName = "Sheet";

export type NativeSheetViewHandle = {
  present: () => void;
  dismiss: () => void;
};

export type SwiftUISheetProps = Omit<
  NativeSheetProps,
  "onNativeDismiss" | "onNativePrimaryAction" | "onNativeSecondaryAction"
> & {
  onDismiss?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

export const SwiftUISheet = forwardRef<NativeSheetViewHandle, SwiftUISheetProps>(
  ({ isPresented = false, onDismiss, onPrimaryAction, onSecondaryAction, ...props }, ref) => {
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
  },
);
SwiftUISheet.displayName = "SwiftUISheet";

export type { NativeSheetDetent, NativeSheetProps } from "../native/SheetViewNativeComponent";
