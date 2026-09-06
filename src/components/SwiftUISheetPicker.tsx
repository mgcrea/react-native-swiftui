import React, { forwardRef, useMemo } from "react";
import type { ViewProps } from "react-native";
import { getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import SheetPickerViewConfig from "../../nitrogen/generated/shared/json/SheetPickerViewConfig.json";
import { usePresentableHandle, type PresentableHandle } from "../hooks";
import type { SheetPickerViewMethods, SheetPickerViewProps } from "../specs/SheetPickerView.nitro";
import type { SheetPickerOption } from "../types";
import { useNativeCallback } from "../utils";

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

export type SwiftUISheetPickerHandle = PresentableHandle;

export const SwiftUISheetPicker = forwardRef<SwiftUISheetPickerHandle, SwiftUISheetPickerProps>(
  function SwiftUISheetPickerComponent({ onChange, onDismiss, options, ...props }, ref) {
    const nativeRef = usePresentableHandle<React.ComponentRef<typeof NativeSheetPickerView>>(ref);
    const autoDismiss = props.autoDismiss ?? true;
    // Copied because the generated nitro props type is a mutable array, while the
    // public prop is readonly so callers can pass an `as const` list.
    const nativeOptions = useMemo(() => [...options], [options]);
    const onNativeSelect = useNativeCallback(onChange);
    const onNativeDismiss = useNativeCallback(onDismiss);

    return (
      <NativeSheetPickerView
        ref={nativeRef}
        onNativeSelect={onNativeSelect}
        onNativeDismiss={onNativeDismiss}
        {...props}
        options={nativeOptions}
        autoDismiss={autoDismiss}
      />
    );
  },
);

SwiftUISheetPicker.displayName = "SwiftUISheetPicker";
