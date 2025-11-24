import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeLazyVGridProps, NativeViewStyle } from "../../types";

export const LazyVGrid: FunctionComponentWithId<PropsWithChildren<NativeLazyVGridProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
  const { id } = useSwiftUINode("LazyVGrid", { style: normalizedStyles, ...otherProps });
  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
LazyVGrid.displayName = "LazyVGrid";
