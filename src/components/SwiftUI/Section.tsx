import type { PropsWithChildren } from "react";

import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = NativeViewStyleProps & {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section = createNodeComponent<PropsWithChildren<NativeSectionProps>>("Section", {
  container: true,
});
