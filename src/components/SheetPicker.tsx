import type { ForwardedRef } from "react";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import NativeSheetPickerView, {
  type NativeSheetPickerOption,
  type NativeSheetPickerProps,
} from "../native/SheetPickerViewNativeComponent";

export type SheetPickerOption = NativeSheetPickerOption;

export type SheetPickerProps = Omit<NativeSheetPickerProps, "onNativeSelect" | "onNativeDismiss"> & {
  options: readonly SheetPickerOption[];
  onSelect?: (value: string) => void;
  onDismiss?: () => void;
};

export type SheetPickerHandle = {
  present: () => void;
  dismiss: () => void;
};

function SheetPickerImpl(
  { onSelect, onDismiss, ...props }: SheetPickerProps,
  ref: ForwardedRef<SheetPickerHandle>,
) {
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
}

export const SheetPicker = forwardRef(SheetPickerImpl);
SheetPicker.displayName = "SheetPicker";

export default SheetPicker;
