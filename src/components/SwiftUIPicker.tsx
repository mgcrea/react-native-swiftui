import React, { forwardRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import NativePickerViewNativeComponent, {
  type NativePickerProps,
  type NativePickerStyle,
} from "../native/PickerViewNativeComponent";
import { NativeTextStyle } from "../types";

type NativePickerComponentRef = React.ComponentRef<typeof NativePickerViewNativeComponent>;

const DEFAULT_HEIGHTS: Record<NativePickerStyle, number> = {
  default: 44,
  inline: 200,
  menu: 44,
  segmented: 32,
  wheel: 216,
};

type NativeOnChangeEvent = Parameters<NonNullable<NativePickerProps["onNativeChange"]>>[0];

export type SwiftUIPickerProps = Omit<
  NativePickerProps,
  "onNativeChange" | "onNativeFocus" | "onNativeBlur" | "style"
> & {
  onChange?: (value: string, event: NativeOnChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: StyleProp<ViewStyle & Pick<NativeTextStyle, "tint">>;
};

export const SwiftUIPicker = forwardRef<NativePickerComponentRef, SwiftUIPickerProps>(
  ({ pickerStyle, style, onChange, onFocus, onBlur, ...restProps }, ref) => {
    const defaultHeight = DEFAULT_HEIGHTS[pickerStyle ?? "default"];
    const composedStyle: StyleProp<ViewStyle> = [{ minHeight: defaultHeight }, style];

    return (
      <NativePickerViewNativeComponent
        {...restProps}
        onNativeChange={
          onChange
            ? (event) => {
                onChange(event.nativeEvent.value, event);
              }
            : undefined
        }
        onNativeFocus={onFocus ?? undefined}
        onNativeBlur={onBlur ?? undefined}
        pickerStyle={pickerStyle}
        style={composedStyle}
        ref={ref}
      />
    );
  },
);

SwiftUIPicker.displayName = "SwiftUIPicker";
