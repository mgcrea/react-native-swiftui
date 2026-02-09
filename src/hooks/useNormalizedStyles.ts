import { useMemo } from "react";
import { type StyleProp, StyleSheet } from "react-native";
import type { NativeTextStyle, NativeViewStyle } from "src/types";

export const useNormalizedStyles = <T extends NativeTextStyle | NativeViewStyle>(
  style?: StyleProp<T>,
): T | undefined => {
  return useMemo(() => (style != null ? StyleSheet.flatten<T>(style) : undefined), [style]) as T | undefined;
};
