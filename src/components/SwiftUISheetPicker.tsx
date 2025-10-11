import React, { forwardRef, useImperativeHandle, useRef } from "react";
import NativeSheetPickerView, {
  type NativeSheetPickerOption,
  type NativeSheetPickerProps,
} from "../native/SheetPickerViewNativeComponent";

export type SheetPickerOption = NativeSheetPickerOption;

export type SwiftUISheetPickerProps = Omit<NativeSheetPickerProps, "onNativeSelect" | "onNativeDismiss"> & {
  options: readonly SheetPickerOption[];
  onSelect?: (value: string) => void;
  onDismiss?: () => void;
};

export type SwiftUISheetPickerHandle = {
  present: () => void;
  dismiss: () => void;
};

export const SwiftUISheetPicker = forwardRef<SwiftUISheetPickerHandle, SwiftUISheetPickerProps>(
  function SwiftUISheetPickerComponent({ onSelect, onDismiss, ...props }, ref) {
    const nativeRef = useRef<React.ComponentRef<typeof NativeSheetPickerView>>(null);
    const autoDismiss = props.autoDismiss ?? true;

    useImperativeHandle(ref, () => ({
      present: () => {
        nativeRef.current?.setNativeProps({ isPresented: true });
      },
      dismiss: () => {
        nativeRef.current?.setNativeProps({ isPresented: false });
      },
    }));

    return (
      <NativeSheetPickerView
        ref={nativeRef}
        onNativeSelect={(event) => {
          if (onSelect) {
            onSelect(event.nativeEvent.value);
          }
          if (autoDismiss) {
            onDismiss?.();
          }
        }}
        onNativeDismiss={onDismiss}
        {...props}
      />
    );
  },
);

SwiftUISheetPicker.displayName = "SwiftUISheetPicker";
