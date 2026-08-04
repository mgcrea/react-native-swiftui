import type { NativeLazyVGridProps } from "../../types";
import { createContainerComponent } from "./createContainerComponent";

// https://developer.apple.com/documentation/swiftui/lazyvgrid

export const LazyVGrid = createContainerComponent<NativeLazyVGridProps>("LazyVGrid");
