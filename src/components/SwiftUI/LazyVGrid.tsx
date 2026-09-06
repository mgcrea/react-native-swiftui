import type { PropsWithChildren } from "react";

import type { NativeLazyVGridProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/lazyvgrid

export const LazyVGrid = createNodeComponent<PropsWithChildren<NativeLazyVGridProps>>("LazyVGrid", {
  container: true,
});
