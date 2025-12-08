import { useEffect, useId, useRef } from "react";
import { useSwiftUIContext, useSwiftUIParentContext, type EventHandler } from "../contexts";
import { useDeepMemo } from "../hooks";
import { WithId } from "../types";
import { lowercaseFirstLetter } from "../utils";

export type SwiftUINodeProps = WithId<Record<string, unknown>>;
export type SwiftUINodeEvents = Record<string, EventHandler | undefined>;

export function useSwiftUINode<T extends SwiftUINodeProps, U extends SwiftUINodeEvents>(
  type: string,
  props: T,
  events?: U,
) {
  const { registerNode, unregisterNode, registerEvents, updateNodeProps, recordRenderOrder } =
    useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/prefer-nullish-coalescing
  const id = props.id || `${lowercaseFirstLetter(type)}:${useId()}`;
  const isInitialRender = useRef(true);

  // Record the render order every render
  recordRenderOrder(id);

  // Register the node on mount
  useEffect(() => {
    registerNode({ type, id, props }, parentId);
    return () => {
      unregisterNode(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id, parentId, registerNode, unregisterNode]);

  // Register the events on mount
  const eventsKeys = events ? Object.keys(events) : [];
  const eventsValues = events ? Object.values(events) : [];
  useEffect(() => {
    if (events) {
      registerEvents(id, events);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, registerEvents, ...eventsKeys, ...eventsValues]);

  const memoizedProps = useDeepMemo(props);
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
