import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/vstack
export type NativeVStackProps = {
  alignment?: "leading" | "center" | "trailing";
  spacing?: number;
};

export const VStack: FunctionComponentWithId<PropsWithChildren<NativeVStackProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("VStack", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
VStack.displayName = "VStack";
