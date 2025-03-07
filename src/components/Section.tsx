import { useId, type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section: FunctionComponentWithId<PropsWithChildren<NativeSectionProps>> = ({
  id,
  children,
  ...otherProps
}) => {
  const effectiveId = id || `section:${useId()}`;

  useSwiftUINode("Section", effectiveId, otherProps);

  return <SwiftUIParentIdProvider id={effectiveId}>{children}</SwiftUIParentIdProvider>;
};
Section.displayName = "Section";
