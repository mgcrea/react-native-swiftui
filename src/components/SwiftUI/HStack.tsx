import type { PropsWithChildren } from "react";

import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/hstack
export type NativeHStackProps = NativeViewStyleProps & {
  alignment?: "top" | "center" | "bottom" | "firstTextBaseline" | "lastTextBaseline";
  spacing?: number;
};

export const HStack = createNodeComponent<PropsWithChildren<NativeHStackProps>>("HStack", { container: true });
