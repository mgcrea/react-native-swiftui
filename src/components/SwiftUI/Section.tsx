import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle, NativeViewStyleProps } from "../../types";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = NativeViewStyleProps & {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section: FunctionComponentWithId<PropsWithChildren<NativeSectionProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  const { id } = useSwiftUINode("Section", { style: normalizedStyles, ...otherProps });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Section.displayName = "Section";
