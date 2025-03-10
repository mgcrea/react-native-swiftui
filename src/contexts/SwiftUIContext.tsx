// src/contexts/SwiftUIContext.tsx
import React, { createContext, RefObject, useCallback, useContext, useRef } from "react";
import type { ViewTreeNode } from "src/types";
import {
  Commands as NativeSwiftUIRootCommands,
  default as SwiftUIRootNativeComponent,
} from "../native/SwiftUIRootNativeComponent";

export type EventHandler = (...args: string[]) => void;
export type EventRegistry = Map<string, Map<string, EventHandler>>;
export type NodeRegistry = Map<string, { node: ViewTreeNode; parentId?: string }>;

export type SwiftUIContextType = {
  getEventHandler: (id: string, name: string) => EventHandler | undefined;
  getNodes: () => NodeRegistry;
  nativeRef: RefObject<React.ComponentRef<typeof SwiftUIRootNativeComponent> | null>;
  recordRenderOrder: (id: string) => void;
  registerEvents: (id: string, events: Record<string, EventHandler | undefined>) => void; // New method
  registerNode: (node: ViewTreeNode, parentId: string) => void;
  renderSequence: RefObject<string[]>;
  unregisterNode: (id: string) => void;
  updateNodeProps: (id: string, props: Record<string, unknown>) => void;
};

const SwiftUIContext = createContext<SwiftUIContextType | undefined>(undefined);

export const SwiftUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const eventRegistry = useRef<EventRegistry>(new Map());
  const nodeRegistry = useRef<NodeRegistry>(new Map());
  const renderSequence = useRef<string[]>([]);
  const nativeRef = useRef<React.ComponentRef<typeof SwiftUIRootNativeComponent> | null>(null);

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

  const registerNode = useCallback((node: ViewTreeNode, parentId?: string) => {
    console.log(`SwiftUIContext registering node with id=${node.id}`, { node, parentId });
    nodeRegistry.current.set(node.id, { node, parentId });
  }, []);

  const unregisterNode = useCallback((id: string) => {
    console.log(`SwiftUIContext unregistering node with id=${id}`);
    nodeRegistry.current.delete(id);
    eventRegistry.current.delete(id);
  }, []);

  const getNodes = useCallback(() => nodeRegistry.current, []);

  const recordRenderOrder = useCallback((id: string) => {
    if (!renderSequence.current.includes(id)) {
      renderSequence.current.push(id);
    }
  }, []);

  const updateNodeProps = useCallback((id: string, props: Record<string, unknown>) => {
    if (!nativeRef.current) {
      console.warn("Native ref not available");
      return;
    }
    const node = nodeRegistry.current.get(id);
    if (!node) {
      console.warn(`Node with id=${id} not found`);
      return;
    }
    console.log(`SwiftUIContext updating node with id=${id}`, { props });
    node.node.props = { ...node.node.props, ...props };
    NativeSwiftUIRootCommands.updateChildProps(nativeRef.current, id, JSON.stringify(props));
  }, []);

  const context = {
    getEventHandler,
    getNodes,
    nativeRef,
    recordRenderOrder,
    registerEvents,
    registerNode,
    renderSequence,
    unregisterNode,
    updateNodeProps,
  };

  return <SwiftUIContext.Provider value={context}>{children}</SwiftUIContext.Provider>;
};

export const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  return context;
};
