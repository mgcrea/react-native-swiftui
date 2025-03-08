import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/form

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NativeGroupProps = {};

export const Group: FunctionComponentWithId<PropsWithChildren<NativeGroupProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Group", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Group.displayName = "Group";
