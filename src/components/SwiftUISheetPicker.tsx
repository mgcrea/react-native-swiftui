import React, { forwardRef, useImperativeHandle, useRef } from "react";
import type { ViewProps } from "react-native";
import { callback, getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import SheetPickerViewConfig from "../../nitrogen/generated/shared/json/SheetPickerViewConfig.json";
import type { SheetPickerViewMethods, SheetPickerViewProps } from "../specs/SheetPickerView.nitro";

const NativeSheetPickerView = getHostComponent<SheetPickerViewProps, SheetPickerViewMethods>(
  "SheetPickerView",
  () => SheetPickerViewConfig as ViewConfig<SheetPickerViewProps>,
);

export type SheetPickerOption = {
  label?: string;
  value: string;
};

export type SwiftUISheetPickerProps = ViewProps & {
  isPresented?: boolean;
  title?: string;
  searchPlaceholder?: string;
  selectedValue?: string;
  options: SheetPickerOption[];
  autoDismiss?: boolean;
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
        onNativeSelect={
          onSelect
            ? callback((value: string) => {
                onSelect(value);
              })
            : undefined
        }
        onNativeDismiss={onDismiss ? callback(onDismiss) : undefined}
        {...props}
        autoDismiss={autoDismiss}
      />
    );
  },
);

SwiftUISheetPicker.displayName = "SwiftUISheetPicker";
