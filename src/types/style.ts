import { ColorValue, TextStyle, ViewStyle } from "react-native";

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
