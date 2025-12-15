/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

export type NativeViewStyle = Pick<
  ViewStyle,
  | "backgroundColor"
  | "borderColor"
  | "borderWidth"
  | "borderRadius"
  | "padding"
  | "paddingHorizontal"
  | "paddingVertical"
  | "paddingLeft"
  | "paddingRight"
  | "paddingTop"
  | "paddingBottom"
  | "width"
  | "minWidth"
  | "maxWidth"
  | "height"
  | "minHeight"
  | "maxHeight"
  | "position"
  | "top"
  | "left"
  | "right"
  | "bottom"
> & {
  tint?: ColorValue;
  tintColor?: ColorValue;
  accentColor?: ColorValue;
  foregroundColor?: ColorValue;
  cornerRadius?: number;
  preferredColorScheme?: "light" | "dark";
};

export type NativeTextStyle = NativeViewStyle &
  Pick<TextStyle, "color" | "fontSize" | "fontWeight" | "textAlign" | "fontFamily"> & {
    font?: NativeFont;
  };

export type NativeFont =
  | "body"
  | "callout"
  | "caption"
  | "caption2"
  | "footnote"
  | "headline"
  | "largeTitle"
  | "subheadline"
  | "title"
  | "title2"
  | "title3";

export interface ViewStyleProps {
  style?: StyleProp<ViewStyle>;
}

export interface NativeTextStyleProps {
  style?: StyleProp<NativeTextStyle>;
}

export interface NativeLabelStyleProps {
  labelStyle?: StyleProp<NativeTextStyle>;
}

export interface NativeViewStyleProps {
  style?: StyleProp<NativeViewStyle>;
}
