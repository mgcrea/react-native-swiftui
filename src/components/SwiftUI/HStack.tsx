import { type PropsWithChildren } from "react";
import { type StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../../types";

// https://developer.apple.com/documentation/swiftui/hstack
export type NativeHStackProps = {
  alignment?: "top" | "center" | "bottom" | "firstTextBaseline" | "lastTextBaseline";
  spacing?: number;
  style?: StyleProp<NativeViewStyle>;
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
