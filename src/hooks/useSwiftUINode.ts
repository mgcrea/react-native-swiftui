import { useEffect, useId, useRef } from "react";

import { useSwiftUIContext, useSwiftUIParentContext, type EventHandler } from "../contexts";
import { useDeepMemo } from "../hooks";
import type { WithId } from "../types";
import { lowercaseFirstLetter } from "../utils";

export type SwiftUINodeProps = WithId<Record<string, unknown>>;
export type SwiftUINodeEvents = Record<string, EventHandler | undefined>;

export function useSwiftUINode<T extends SwiftUINodeProps, U extends SwiftUINodeEvents>(
  type: string,
  props: T,
  events?: U,
) {
  const {
    registerNode,
    unregisterNode,
    registerEvents,
    unregisterEvents,
    updateNodeProps,
    recordRenderOrder,
  } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const generatedId = useId();
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const id = props.id || `${lowercaseFirstLetter(type)}:${generatedId}`;
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
    // Cleanup lives here rather than in `unregisterNode`: this effect and the
    // registration effect above have different deps, so a re-parent runs that
    // one's cleanup without re-running this one. Tearing handlers down there
    // left them permanently unregistered.
    return () => {
      unregisterEvents(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, registerEvents, unregisterEvents, ...eventsKeys, ...eventsValues]);

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
