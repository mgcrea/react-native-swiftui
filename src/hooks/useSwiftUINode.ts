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
  const id = props.id || `${lowercaseFirstLetter(type)}:${generatedId}`;
  const isInitialRender = useRef(true);

  // Latest props, read by the registration effect below. Registration only needs
  // whatever is current at the moment it runs — ongoing changes flow through the
  // `updateNodeProps` effect — so this stays out of that effect's dependencies
  // rather than re-registering the node on every prop change.
  const propsRef = useRef(props);
  propsRef.current = props;

  // Record the render order every render
  recordRenderOrder(id);

  // Register the node on mount
  useEffect(() => {
    registerNode({ type, id, props: propsRef.current }, parentId);
    return () => {
      unregisterNode(id);
    };
  }, [type, id, parentId, registerNode, unregisterNode]);

  // Keep the registry pointed at the latest handlers. Deliberately no dependency
  // array: handler identities are caller-controlled and usually inline, and
  // `registerEvents` is an idempotent set of Map writes. The previous form spread
  // the handlers into the array (`[...eventsKeys, ...eventsValues]`), which React
  // rejects outright the moment a caller builds `events` conditionally, since the
  // array would change size between renders.
  useEffect(() => {
    if (events) {
      registerEvents(id, events);
    }
  });

  // Torn down only when the node itself goes away or changes identity — and here
  // rather than in `unregisterNode`, because that effect's dependencies differ:
  // a re-parent runs its cleanup without re-running this one, which used to leave
  // handlers permanently unregistered.
  useEffect(() => {
    return () => {
      unregisterEvents(id);
    };
  }, [id, unregisterEvents]);

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
