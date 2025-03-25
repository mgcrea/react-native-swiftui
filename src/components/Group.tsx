import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeGroupProps = {
  style?: NativeViewStyle;
};

export const Group: FunctionComponentWithId<PropsWithChildren<NativeGroupProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Group", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Group.displayName = "Group";
