import { PlatformColor } from "react-native";
import type { NativeTextStyle } from "../types";

export const pickerButtonStyles: NativeTextStyle = {
  color: PlatformColor("label"),
  backgroundColor: PlatformColor("tertiarySystemFill"),
  paddingVertical: 7,
  paddingHorizontal: 12,
  borderRadius: 8,
};
