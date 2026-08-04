import type { NativeViewStyleProps } from "../../types";
import { createContainerComponent } from "./createContainerComponent";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = NativeViewStyleProps & {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section = createContainerComponent<NativeSectionProps>("Section");
