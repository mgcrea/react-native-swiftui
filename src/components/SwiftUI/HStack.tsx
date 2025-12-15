import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle, NativeViewStyleProps } from "../../types";

// https://developer.apple.com/documentation/swiftui/hstack
export type NativeHStackProps = NativeViewStyleProps & {
  alignment?: "top" | "center" | "bottom" | "firstTextBaseline" | "lastTextBaseline";
  spacing?: number;
};

export const HStack: FunctionComponentWithId<PropsWithChildren<NativeHStackProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  const { id } = useSwiftUINode("HStack", { style: normalizedStyles, ...otherProps });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
HStack.displayName = "HStack";
