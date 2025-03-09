import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/hstack
export type NativeHStackProps = {
  alignment?: "top" | "center" | "bottom" | "firstTextBaseline" | "lastTextBaseline";
  spacing?: number;
};

export const HStack: FunctionComponentWithId<PropsWithChildren<NativeHStackProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("HStack", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
HStack.displayName = "HStack";
