import { TextStyle, ViewStyle } from "react-native";

export type NativeViewStyle = Pick<
  ViewStyle,
  | "backgroundColor"
  | "borderColor"
  | "borderWidth"
  | "borderRadius"
  | "padding"
  | "paddingHorizontal"
  | "paddingVertical"
  | "width"
  | "height"
> & {
  cornerRadius?: number;
};

export type NativeTextStyle = NativeViewStyle &
  Pick<TextStyle, "color" | "fontSize" | "fontWeight" | "textAlign"> & {
    foregroundColor?: string;
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
