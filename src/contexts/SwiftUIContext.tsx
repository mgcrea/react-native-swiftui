// src/contexts/SwiftUIContext.tsx
import React, {
  createContext,
  type FunctionComponent,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import type { ViewTreeNode } from "src/types";
import {
  Commands as NativeSwiftUIRootCommands,
  default as SwiftUIRootNativeComponent,
} from "../native/SwiftUIRootNativeComponent";

export type EventHandler = (...args: string[]) => void;
export type EventRegistry = Map<string, Map<string, EventHandler>>;
export type NodeRegistry = Map<string, { node: ViewTreeNode; parentId?: string }>;

export type SwiftUIContextValue = {
  getEventHandler: (id: string, name: string) => EventHandler | undefined;
  nodesKey: string;
  renderSequenceKey: string;
  getNodes: () => NodeRegistry;
  nativeRef: RefObject<React.ComponentRef<typeof SwiftUIRootNativeComponent> | null>;
  recordRenderOrder: (id: string) => void;
  commitRenderSequence: () => void;
  registerEvents: (id: string, events: Record<string, EventHandler | undefined>) => void;
  registerEvent: (id: string, name: string, handler: EventHandler) => void;
  registerNode: (node: ViewTreeNode, parentId: string) => void;
  renderSequence: RefObject<string[]>;
  unregisterNode: (id: string) => void;
  updateNodeProps: (id: string, props: Record<string, unknown>) => void;
};

const SwiftUIContext = createContext<SwiftUIContextValue | undefined>(undefined);

export type SwiftUIProviderProps = {
  id: string;
  debug?: boolean;
};

export const SwiftUIProvider: FunctionComponent<PropsWithChildren<SwiftUIProviderProps>> = ({
  id: rootId,
  debug,
  children,
}) => {
  const eventRegistry = useRef<EventRegistry>(new Map());
  const nodeRegistry = useRef<NodeRegistry>(new Map());
  const [nodeRegistryVersion, setNodeRegistryVersion] = useState(0);
  const [renderSequenceVersion, setRenderSequenceVersion] = useState(0);
  const renderSequence = useRef<string[]>([]);
  const previousRenderSequence = useRef<string[]>([]);
  const nativeRef = useRef<React.ComponentRef<typeof SwiftUIRootNativeComponent> | null>(null);

  const log = useCallback(
    (message: string, ...args: unknown[]) => {
      if (debug) {
        console.log(`SwiftUIContext(${rootId}) ${message}`, ...args);
      }
    },
    [debug, rootId],
  );

  // Version counters for change detection - used as dependency keys
  const nodesKey = `nodes-v${nodeRegistryVersion}`;
  const renderSequenceKey = `seq-v${renderSequenceVersion}`;

  const getEventHandler = (id: string, name: string) => {
    return eventRegistry.current.get(id)?.get(name);
  };

  const getEventHandlersForId = (id: string) => {
    const handlersForId = eventRegistry.current.get(id);
    if (handlersForId) {
      return handlersForId;
    }
    const newHandlersForId = new Map<string, EventHandler>();
    eventRegistry.current.set(id, newHandlersForId);
    return newHandlersForId;
  };
  const registerEvent = useCallback(
    (id: string, name: string, handler: EventHandler) => {
      const handlersForId = getEventHandlersForId(id);
      if (handlersForId.has(name)) {
        log(`overwriting existing event handler for ${id}:${name}`);
      }
      handlersForId.set(name, handler);
    },
    [log],
  );

  const registerEvents = useCallback((id: string, events: Record<string, EventHandler | undefined>) => {
    const handlersForId = getEventHandlersForId(id);
    Object.entries(events).forEach(([name, handler]) => {
      if (handler) {
        // if (handlersForId.has(name)) {
        //   console.log(`Overwriting existing event handler for ${id}:${name}`);
        // }
        handlersForId.set(name, handler);
      } else {
        handlersForId.delete(name);
      }
    });
  }, []);

  const registerNode = useCallback(
    (node: ViewTreeNode, parentId?: string) => {
      log(`registering node with id=${node.id}`, { node, parentId });
      nodeRegistry.current.set(node.id, { node, parentId });
      setNodeRegistryVersion((prev) => prev + 1);
    },
    [log],
  );

  const unregisterNode = useCallback(
    (id: string) => {
      log(`unregistering node with id=${id}`);
      nodeRegistry.current.delete(id);
      eventRegistry.current.delete(id);
      setNodeRegistryVersion((prev) => prev + 1);
    },
    [log],
  );

  const getNodes = useCallback(() => nodeRegistry.current, []);

  const recordRenderOrder = useCallback((id: string) => {
    // During render, just append to the sequence - don't trigger state updates
    // The sequence will be reset before each render pass in SwiftUIRoot
    renderSequence.current.push(id);
  }, []);

  const commitRenderSequence = useCallback(() => {
    // After render, check if order actually changed and only then bump version
    const currentSequence = renderSequence.current;
    const prevSequence = previousRenderSequence.current;

    // Compare sequences - only update if they differ
    if (
      currentSequence.length !== prevSequence.length ||
      currentSequence.some((id, index) => id !== prevSequence[index])
    ) {
      previousRenderSequence.current = [...currentSequence];
      setRenderSequenceVersion((prev) => prev + 1);
    }
  }, []);

  const updateNodeProps = useCallback(
    (id: string, props: Record<string, unknown>) => {
      if (!nativeRef.current) {
        log("[warn] native ref not available");
        return;
      }
      const node = nodeRegistry.current.get(id);
      if (!node) {
        log(`[warn] node with id=${id} not found`);
        return;
      }
      log(`updating node with id=${id}`, { props });
      node.node.props = { ...node.node.props, ...props };
      NativeSwiftUIRootCommands.updateChildProps(nativeRef.current, id, JSON.stringify(props));
    },
    [log],
  );

  const context = {
    getEventHandler,
    nodesKey,
    renderSequenceKey,
    getNodes,
    nativeRef,
    recordRenderOrder,
    commitRenderSequence,
    registerEvents,
    registerEvent,
    registerNode,
    renderSequence,
    unregisterNode,
    updateNodeProps,
  };

  return <SwiftUIContext.Provider value={context}>{children}</SwiftUIContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  return context;
};
