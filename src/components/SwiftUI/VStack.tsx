import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle, NativeViewStyleProps } from "../../types";

// https://developer.apple.com/documentation/swiftui/vstack
export type NativeVStackProps = NativeViewStyleProps & {
  alignment?: "leading" | "center" | "trailing";
  spacing?: number;
};

export const VStack: FunctionComponentWithId<PropsWithChildren<NativeVStackProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  const { id } = useSwiftUINode("VStack", { style: normalizedStyles, ...otherProps });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
VStack.displayName = "VStack";
