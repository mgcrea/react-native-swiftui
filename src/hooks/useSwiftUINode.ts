import { useEffect, useRef } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import { useJsonMemo } from "../hooks";

export function useSwiftUINode<T extends Record<string, any>>(type: string, id: string, props: T) {
  const { registerNode, unregisterNode, updateNodeProps } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const isInitialRender = useRef(true);

  useEffect(() => {
    registerNode({ type, id, props }, parentId);
    return () => unregisterNode(id);
  }, [id, parentId, registerNode, unregisterNode]);

  const memoizedProps = useJsonMemo(props);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    updateNodeProps(id, memoizedProps);
  }, [id, memoizedProps, updateNodeProps]);
}
