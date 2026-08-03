// src/contexts/SwiftUIContext.tsx
import {
  type ComponentRef,
  createContext,
  type FunctionComponent,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNativeView } from "react-native-nitro-modules";
import type {
  SwiftUIRootView,
  SwiftUIRootViewMethods,
  SwiftUIRootViewProps,
} from "src/specs/SwiftUIRootView.nitro";
import type { ViewTreeNode } from "src/types";

export type EventHandler = (...args: string[]) => void;
export type EventRegistry = Map<string, Map<string, EventHandler>>;
export type NodeRegistry = Map<string, { node: ViewTreeNode; parentId?: string }>;

export type SwiftUIRootViewRef = ComponentRef<ReactNativeView<SwiftUIRootViewProps, SwiftUIRootViewMethods>>;

export type SwiftUIContextValue = {
  getEventHandler: (id: string, name: string) => EventHandler | undefined;
  nodesKey: string;
  renderSequenceKey: string;
  getNodes: () => NodeRegistry;
  nativeRef: RefObject<SwiftUIRootViewRef | null>;
  hybridRef: RefObject<SwiftUIRootView | null>;
  recordRenderOrder: (id: string) => void;
  commitRenderSequence: () => void;
  registerEvents: (id: string, events: Record<string, EventHandler | undefined>) => void;
  registerEvent: (id: string, name: string, handler: EventHandler) => void;
  registerNode: (node: ViewTreeNode, parentId?: string) => void;
  renderSequence: RefObject<string[]>;
  unregisterEvents: (id: string) => void;
  unregisterNode: (id: string) => void;
  updateNodeProps: (id: string, props: Record<string, unknown>) => void;
  flushPendingProps: () => void;
};

/**
 * `JSON.stringify` omits keys whose value is `undefined`, and the Swift side
 * deliberately skips keys absent from the payload (`merge(from:presentKeys:)`).
 * Without a sentinel, clearing a prop (`maxLength: 10` -> `undefined`) would be
 * indistinguishable from not mentioning it, and so impossible.
 */
const serializeProps = (props: Record<string, unknown>) =>
  JSON.stringify(props, (_key, value: unknown) => (value === undefined ? null : value));

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
  const nativeRef = useRef<SwiftUIRootViewRef | null>(null);
  const hybridRef = useRef<SwiftUIRootView | null>(null);
  // Prop updates that arrived before the native view attached, merged per node.
  const pendingProps = useRef<Map<string, Record<string, unknown>>>(new Map());

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

  const getEventHandler = useCallback((id: string, name: string) => {
    return eventRegistry.current.get(id)?.get(name);
  }, []);

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
      pendingProps.current.delete(id);
      setNodeRegistryVersion((prev) => prev + 1);
    },
    [log],
  );

  /**
   * Owned by the events effect in `useSwiftUINode`, deliberately *not* by
   * `unregisterNode`. The two effects have different dependency lists, so a node
   * that re-registers (a changed `parentId` or `type`) runs the node cleanup
   * without re-running the events effect. Deleting handlers there left the node
   * alive with its `onChange`/`onPress` silently gone for good.
   */
  const unregisterEvents = useCallback(
    (id: string) => {
      log(`unregistering events for id=${id}`);
      eventRegistry.current.delete(id);
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
      const node = nodeRegistry.current.get(id);
      if (!node) {
        log(`[warn] node with id=${id} not found`);
        return;
      }
      log(`updating node with id=${id}`, { props });

      // Always merge into the registry, even with no hybrid ref: the view tree
      // is rebuilt from it, so bailing out early dropped the update on both
      // paths at once.
      node.node.props = { ...node.node.props, ...props };

      if (!hybridRef.current) {
        // `hybridRef` is assigned from a native callback that triggers no
        // re-render, so nothing would retry this later. Buffer until it lands.
        log("hybrid ref not available yet, buffering props");
        pendingProps.current.set(id, { ...pendingProps.current.get(id), ...props });
        return;
      }

      hybridRef.current.updateChildProps(id, serializeProps(props));
    },
    [log],
  );

  /** Drains anything buffered before the native view attached. */
  const flushPendingProps = useCallback(() => {
    const hybrid = hybridRef.current;
    if (!hybrid || pendingProps.current.size === 0) {
      return;
    }
    const buffered = pendingProps.current;
    pendingProps.current = new Map();
    buffered.forEach((props, id) => {
      log(`flushing buffered props for id=${id}`, { props });
      hybrid.updateChildProps(id, serializeProps(props));
    });
  }, [log]);

  // Memoized: an unstable context value re-renders the whole subtree and, worse,
  // hands the native bridge a fresh `onEvent`/`hybridRef` callback on every
  // render (see `SwiftUIRoot`).
  const context = useMemo<SwiftUIContextValue>(
    () => ({
      getEventHandler,
      nodesKey,
      renderSequenceKey,
      getNodes,
      nativeRef,
      hybridRef,
      recordRenderOrder,
      commitRenderSequence,
      registerEvents,
      registerEvent,
      registerNode,
      renderSequence,
      unregisterEvents,
      unregisterNode,
      updateNodeProps,
      flushPendingProps,
    }),
    [
      getEventHandler,
      nodesKey,
      renderSequenceKey,
      getNodes,
      recordRenderOrder,
      commitRenderSequence,
      registerEvents,
      registerEvent,
      registerNode,
      unregisterEvents,
      unregisterNode,
      updateNodeProps,
      flushPendingProps,
    ],
  );

  return <SwiftUIContext.Provider value={context}>{children}</SwiftUIContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  return context;
};
