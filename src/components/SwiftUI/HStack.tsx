import type { NativeViewStyleProps } from "../../types";
import { createContainerComponent } from "./createContainerComponent";

// https://developer.apple.com/documentation/swiftui/hstack
export type NativeHStackProps = NativeViewStyleProps & {
  alignment?: "top" | "center" | "bottom" | "firstTextBaseline" | "lastTextBaseline";
  spacing?: number;
};

export const HStack = createContainerComponent<NativeHStackProps>("HStack");
