import { useId, type PropsWithChildren } from "react";
import { useSwiftUIContext, SwiftUIParentIdProvider, useSwiftUIParentContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/section

export type NativeSectionProps = {
  header?: string;
  footer?: string;
  isCollapsed?: boolean;
};

export const Section: IdentifiableFunctionComponent<PropsWithChildren<NativeSectionProps>> = ({
  id,
  children,
  ...otherProps
}) => {
  const { registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `section:${useId()}`;

  registerNode(
    {
      type: "Section",
      id: effectiveId,
      props: otherProps,
      children: [],
    },
    parentId,
  );

  return <SwiftUIParentIdProvider id={effectiveId}>{children}</SwiftUIParentIdProvider>;
};
Section.displayName = "Section";
