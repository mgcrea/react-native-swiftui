import { useEffect, useId, type PropsWithChildren } from "react";
import { useSwiftUIContext, SwiftUIParentIdProvider, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";
import { useJsonMemo } from "../hooks";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section: FunctionComponentWithId<PropsWithChildren<NativeSectionProps>> = ({
  id,
  children,
  ...otherProps
}) => {
  const { registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `section:${useId()}`;

  const memoizedProps = useJsonMemo(otherProps);
  useEffect(() => {
    registerNode(
      {
        type: "Section",
        id: effectiveId,
        props: memoizedProps,
        children: [],
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, memoizedProps, parentId, registerNode, unregisterNode]);

  return <SwiftUIParentIdProvider id={effectiveId}>{children}</SwiftUIParentIdProvider>;
};
Section.displayName = "Section";
