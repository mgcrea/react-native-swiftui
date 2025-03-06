import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIParentContext, useSwiftUIContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "src/types";

// src/components/Text.tsx
export type NativeTextProps = {
  text: string;
  font?: "body" | "headline" | "title" | "caption";
  color?: string; // e.g., "red", "blue", hex
  alignment?: "leading" | "center" | "trailing";
};

export const Text: IdentifiableFunctionComponent<NativeTextProps> = ({ id, ...otherProps }) => {
  const { registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `text:${useId()}`;

  useEffect(() => {
    registerNode(
      {
        type: "Text",
        id: effectiveId,
        props: otherProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, otherProps, parentId, registerNode, unregisterNode]);

  return null;
};
