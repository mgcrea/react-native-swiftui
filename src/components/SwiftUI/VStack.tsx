import type { NativeViewStyleProps } from "../../types";
import { createContainerComponent } from "./createContainerComponent";

// https://developer.apple.com/documentation/swiftui/vstack
export type NativeVStackProps = NativeViewStyleProps & {
  alignment?: "leading" | "center" | "trailing";
  spacing?: number;
};

export const VStack = createContainerComponent<NativeVStackProps>("VStack");
