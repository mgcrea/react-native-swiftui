import React, { forwardRef } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { callback, getHostComponent, type ViewConfig } from "react-native-nitro-modules";

import PickerViewConfig from "../../nitrogen/generated/shared/json/PickerViewConfig.json";
import type { PickerViewMethods, PickerViewProps } from "../specs/PickerView.nitro";
import type { NativeTextStyle } from "../types";

const NativePickerView = getHostComponent<PickerViewProps, PickerViewMethods>(
  "PickerView",
  () => PickerViewConfig as ViewConfig<PickerViewProps>,
);

export type PickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";
export type ControlSize = "mini" | "small" | "regular" | "large" | "extraLarge";

export type PickerOption = {
  value: string;
  label?: string;
  icon?: string;
};

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
  options?: PickerOption[];
  pickerStyle?: PickerStyle;
  controlSize?: ControlSize;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle & Pick<NativeTextStyle, "tint">>;
};

export const SwiftUIPicker = forwardRef<NativePickerComponentRef, SwiftUIPickerProps>(
  ({ pickerStyle, style, onChange, onFocus: _onFocus, onBlur: _onBlur, ...restProps }, ref) => {
    const defaultHeight = DEFAULT_HEIGHTS[pickerStyle ?? "default"];
    const composedStyle: StyleProp<ViewStyle> = [{ minHeight: defaultHeight }, style];

    return (
      <NativePickerView
        {...restProps}
        onNativeChange={
          onChange
            ? callback((value: string) => {
                onChange(value);
              })
            : undefined
        }
        pickerStyle={pickerStyle}
        style={composedStyle}
        ref={ref}
      />
    );
  },
);

SwiftUIPicker.displayName = "SwiftUIPicker";
