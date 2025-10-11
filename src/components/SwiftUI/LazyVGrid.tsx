import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeLazyVGridProps } from "../../types";

export const LazyVGrid: FunctionComponentWithId<PropsWithChildren<NativeLazyVGridProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("LazyVGrid", otherProps);
  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
LazyVGrid.displayName = "LazyVGrid";
