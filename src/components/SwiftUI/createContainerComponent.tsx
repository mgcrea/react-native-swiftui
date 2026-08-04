import { type PropsWithChildren } from "react";

import { SwiftUIParentIdProvider } from "../../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId, NativeViewStyle, NativeViewStyleProps } from "../../types";

/**
 * Builds a container component: one that registers a node, normalizes `style`,
 * and provides its own id as the parent for its children.
 *
 * Group, Form, Section, HStack, VStack, ZStack and LazyVGrid had byte-identical
 * bodies differing only in the node type string. Their prop *types* still differ
 * (alignment, spacing, columns, header/footer …), which is why this is generic
 * over `TProps` rather than a shared props type.
 *
 * Spacer is deliberately not built with this — it has no `style` prop — and
 * Image and Button do real per-prop work of their own.
 */
export const createContainerComponent = <TProps extends NativeViewStyleProps>(
  type: string,
  displayName: string = type,
): FunctionComponentWithId<PropsWithChildren<TProps>> => {
  const Container: FunctionComponentWithId<PropsWithChildren<TProps>> = ({
    children,
    style,
    ...otherProps
  }) => {
    const normalizedStyles = useNormalizedStyles<NativeViewStyle>(style);
    const { id } = useSwiftUINode(type, { style: normalizedStyles, ...otherProps });

    return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
  };
  Container.displayName = displayName;
  return Container;
};
