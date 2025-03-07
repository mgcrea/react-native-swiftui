import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIParentContext, useSwiftUIContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";
import { useJsonMemo } from "../hooks";

export type NativeTextProps = {
  text: string;
  font?: "body" | "headline" | "title" | "caption";
  color?: string; // e.g., "red", "blue", hex
  alignment?: "leading" | "center" | "trailing";
};

export const Text: FunctionComponentWithId<NativeTextProps> = ({ id, ...otherProps }) => {
  const { registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `text:${useId()}`;

  const memoizedProps = useJsonMemo(otherProps);
  useEffect(() => {
    registerNode(
      {
        type: "Text",
        id: effectiveId,
        props: memoizedProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, memoizedProps, parentId, registerNode, unregisterNode]);

  return null;
};
Text.displayName = "Text";
