import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
  style?: NativeViewStyle;
};

export const Section: FunctionComponentWithId<PropsWithChildren<NativeSectionProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Section", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Section.displayName = "Section";
