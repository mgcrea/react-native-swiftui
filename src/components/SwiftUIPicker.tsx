import React, { forwardRef, useMemo } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import PickerViewConfig from "../../nitrogen/generated/shared/json/PickerViewConfig.json";
import type { PickerViewMethods, PickerViewProps } from "../specs/PickerView.nitro";
import type { ControlSize, NativeTextStyle, PickerOption, PickerStyle } from "../types";
import { useNativeCallback } from "../utils";

const NativePickerView = getHostComponent<PickerViewProps, PickerViewMethods>(
  "PickerView",
  () => PickerViewConfig as ViewConfig<PickerViewProps>,
);

const DEFAULT_HEIGHTS: Record<PickerStyle, number> = {
  default: 44,
  inline: 200,
  menu: 44,
  segmented: 32,
  wheel: 216,
};

type NativePickerComponentRef = React.ComponentRef<typeof NativePickerView>;

export type SwiftUIPickerProps = ViewProps & {
  value?: string;
  selection?: string;
  label?: string;
  labelColor?: string;
  // `readonly` to match the declarative API, which already accepts it. Without
  // this a caller's `as const` option list is rejected here but fine there.
  options?: readonly PickerOption[];
  pickerStyle?: PickerStyle;
  controlSize?: ControlSize;
  disabled?: boolean;
  // No `onFocus`/`onBlur`: they were declared here, destructured and discarded.
  // The nitro spec has no focus callbacks, so they never fired.
  onChange?: (value: string) => void;
  style?: StyleProp<ViewStyle & Pick<NativeTextStyle, "tint">>;
};

export const SwiftUIPicker = forwardRef<NativePickerComponentRef, SwiftUIPickerProps>(
  ({ pickerStyle, style, options, onChange, ...restProps }, ref) => {
    // Memoized: a new array identity per render re-set the native prop each time.
    const composedStyle: StyleProp<ViewStyle> = useMemo(
      () => [{ minHeight: DEFAULT_HEIGHTS[pickerStyle ?? "default"] }, style],
      [pickerStyle, style],
    );
    // Copied because the generated nitro props type is a mutable array, while the
    // public prop is readonly so callers can pass an `as const` list.
    const nativeOptions = useMemo(() => (options ? [...options] : undefined), [options]);
    const onNativeChange = useNativeCallback(onChange);

    return (
      <NativePickerView
        {...restProps}
        options={nativeOptions}
        onNativeChange={onNativeChange}
        pickerStyle={pickerStyle}
        style={composedStyle}
        ref={ref}
      />
    );
  },
);

SwiftUIPicker.displayName = "SwiftUIPicker";
