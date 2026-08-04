import React, { forwardRef, useImperativeHandle, useRef } from "react";
import type { ViewProps } from "react-native";
import { callback, getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import SheetPickerViewConfig from "../../nitrogen/generated/shared/json/SheetPickerViewConfig.json";
import type { SheetPickerViewMethods, SheetPickerViewProps } from "../specs/SheetPickerView.nitro";
import type { SheetPickerOption } from "../types";

const NativeSheetPickerView = getHostComponent<SheetPickerViewProps, SheetPickerViewMethods>(
  "SheetPickerView",
  () => SheetPickerViewConfig as ViewConfig<SheetPickerViewProps>,
);

export type SwiftUISheetPickerProps = ViewProps & {
  isPresented?: boolean;
  title?: string;
  searchPlaceholder?: string;
  selectedValue?: string;
  options: readonly SheetPickerOption[];
  autoDismiss?: boolean;
  /**
   * Named `onChange` to match every other component in the library. The nitro
   * prop underneath is still `onNativeSelect`.
   */
  onChange?: (value: string) => void;
  onDismiss?: () => void;
};

export type SwiftUISheetPickerHandle = {
  present: () => void;
  dismiss: () => void;
};

export const SwiftUISheetPicker = forwardRef<SwiftUISheetPickerHandle, SwiftUISheetPickerProps>(
  function SwiftUISheetPickerComponent({ onChange, onDismiss, options, ...props }, ref) {
    const nativeRef = useRef<React.ComponentRef<typeof NativeSheetPickerView>>(null);
    const autoDismiss = props.autoDismiss ?? true;
    // Copied because the generated nitro props type is a mutable array, while the
    // public prop is readonly so callers can pass an `as const` list.
    const nativeOptions = [...options];

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
          onChange
            ? callback((value: string) => {
                onChange(value);
              })
            : undefined
        }
        onNativeDismiss={onDismiss ? callback(onDismiss) : undefined}
        {...props}
        options={nativeOptions}
        autoDismiss={autoDismiss}
      />
    );
  },
);

SwiftUISheetPicker.displayName = "SwiftUISheetPicker";
