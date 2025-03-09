import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

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
};

export const ZStack: FunctionComponentWithId<PropsWithChildren<NativeZStackProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("ZStack", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
ZStack.displayName = "ZStack";
