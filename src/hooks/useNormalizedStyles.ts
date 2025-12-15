import { useMemo } from "react";
import { type StyleProp, StyleSheet } from "react-native";
import type { NativeTextStyle, NativeViewStyle } from "src/types";

export const useNormalizedStyles = <T extends NativeTextStyle | NativeViewStyle>(
  style?: StyleProp<T>,
): T | undefined => {
  return useMemo(() => (Array.isArray(style) ? StyleSheet.flatten<T>(style) : style), [style]) as
    | T
    | undefined;
};
