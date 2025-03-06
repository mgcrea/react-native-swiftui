import { useEffect, useId, type PropsWithChildren } from "react";
import { useSwiftUIContext, SwiftUIParentIdProvider, useSwiftUIParentContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeFormProps = {};

export const Form: IdentifiableFunctionComponent<React.PropsWithChildren<NativeFormProps>> = ({
  id,
  children,
}) => {
  const { registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `form:${useId()}`;

  useEffect(() => {
    registerNode(
      {
        type: "Form",
        id: effectiveId,
        children: [],
      },
      parentId,
    );
  }, [effectiveId, parentId, registerNode]);

  return <SwiftUIParentIdProvider id={effectiveId}>{children}</SwiftUIParentIdProvider>;
};
Form.displayName = "Form";
