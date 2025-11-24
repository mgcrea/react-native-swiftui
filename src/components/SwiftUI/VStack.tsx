import { type PropsWithChildren } from "react";
import { type StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../../types";

// https://developer.apple.com/documentation/swiftui/vstack
export type NativeVStackProps = {
  alignment?: "leading" | "center" | "trailing";
  spacing?: number;
  style?: StyleProp<NativeViewStyle>;
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
