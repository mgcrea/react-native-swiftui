import { type PropsWithChildren } from "react";
import { type StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../../types";

// https://developer.apple.com/documentation/swiftui/zstack
export type NativeZStackProps = {
  alignment?:
    | "topLeading"
    | "top"
    | "topTrailing"
    | "leading"
    | "center"
    | "trailing"
    | "bottomLeading"
    | "bottom"
    | "bottomTrailing";
  style?: StyleProp<NativeViewStyle>;
};

export const ZStack: FunctionComponentWithId<PropsWithChildren<NativeZStackProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  const { id } = useSwiftUINode("ZStack", { style: normalizedStyles, ...otherProps });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
ZStack.displayName = "ZStack";
