import { useEffect, useId, useRef } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import { useJsonMemo } from "../hooks";
import { WithId } from "../types";
import { lowercaseFirstLetter } from "../utils";

export function useSwiftUINode<T extends WithId<Record<string, unknown>>>(type: string, props: T) {
  const { registerNode, unregisterNode, updateNodeProps, recordRenderOrder } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/prefer-nullish-coalescing
  const id = props.id || `${lowercaseFirstLetter(type)}:${useId()}`;
  const isInitialRender = useRef(true);

  // Record the render order every render
  recordRenderOrder(id);

  useEffect(() => {
    registerNode({ type, id, props }, parentId);
    return () => {
      unregisterNode(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, parentId, registerNode, unregisterNode]);

  const memoizedProps = useJsonMemo(props);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    updateNodeProps(id, memoizedProps);
  }, [id, memoizedProps, updateNodeProps]);

  return {
    id,
    parentId,
  };
}
