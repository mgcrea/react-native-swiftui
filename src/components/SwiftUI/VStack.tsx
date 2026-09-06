import type { PropsWithChildren } from "react";

import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/vstack
export type NativeVStackProps = NativeViewStyleProps & {
  alignment?: "leading" | "center" | "trailing";
  spacing?: number;
};

export const VStack = createNodeComponent<PropsWithChildren<NativeVStackProps>>("VStack", { container: true });
