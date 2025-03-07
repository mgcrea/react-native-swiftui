import { useEffect, useId, type PropsWithChildren } from "react";
import { useSwiftUIContext, SwiftUIParentIdProvider, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeFormProps = {};

export const Form: FunctionComponentWithId<PropsWithChildren<NativeFormProps>> = ({ id, children }) => {
  const { registerNode, unregisterNode } = useSwiftUIContext();
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
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, parentId, registerNode, unregisterNode]);

  return <SwiftUIParentIdProvider id={effectiveId}>{children}</SwiftUIParentIdProvider>;
};
Form.displayName = "Form";
