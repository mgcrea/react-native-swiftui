import { useEffect, useId, type PropsWithChildren } from "react";
import { useSwiftUIContext, SwiftUIParentIdProvider, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";

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

  useEffect(() => {
    registerNode(
      {
        type: "Section",
        id: effectiveId,
        props: otherProps,
        children: [],
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, otherProps, parentId, registerNode, unregisterNode]);

  return <SwiftUIParentIdProvider id={effectiveId}>{children}</SwiftUIParentIdProvider>;
};
Section.displayName = "Section";
