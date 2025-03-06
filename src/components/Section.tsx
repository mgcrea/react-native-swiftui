import { type PropsWithChildren } from "react";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section: IdentifiableFunctionComponent<
  PropsWithChildren<NativeSectionProps>
> = ({ id, children }) => {
  return <>{children}</>;
};
Section.displayName = "Section";
