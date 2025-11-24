import { type PropsWithChildren } from "react";
import { type StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../../types";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
  style?: StyleProp<NativeViewStyle>;
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
