import React, { forwardRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import NativePickerViewNativeComponent, {
  type NativePickerProps,
  type NativePickerStyle,
} from "./native/PickerViewNativeComponent";

type NativePickerComponentRef = React.ComponentRef<typeof NativePickerViewNativeComponent>;

const DEFAULT_HEIGHTS: Record<NativePickerStyle, number> = {
  default: 44,
  inline: 200,
  menu: 44,
  segmented: 32,
  wheel: 216,
};

const SwiftUIPicker = forwardRef<NativePickerComponentRef, NativePickerProps>(
  ({ pickerStyle, style, ...restProps }, ref) => {
    const defaultHeight = DEFAULT_HEIGHTS[pickerStyle ?? "default"];
    const composedStyle: StyleProp<ViewStyle> = [{ minHeight: defaultHeight }, style];

    return (
      <NativePickerViewNativeComponent
        {...restProps}
        pickerStyle={pickerStyle}
        style={composedStyle}
        ref={ref}
      />
    );
  },
);

SwiftUIPicker.displayName = "SwiftUIPicker";

export default SwiftUIPicker;
export type { NativePickerProps, NativePickerStyle } from "./native/PickerViewNativeComponent";
