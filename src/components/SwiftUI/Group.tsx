import { type PropsWithChildren } from "react";
import { type StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../../types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeGroupProps = {
  style?: StyleProp<NativeViewStyle>;
};

export const Group: FunctionComponentWithId<PropsWithChildren<NativeGroupProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  const { id } = useSwiftUINode("Group", { style: normalizedStyles, ...otherProps });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Group.displayName = "Group";
