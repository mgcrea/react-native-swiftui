// src/contexts/SwiftUIContext.tsx
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import type { ViewTreeNode } from "src/types";
import {
  default as SwiftUIRootNativeComponent,
  Commands as NativeSwiftUIRootCommands,
} from "../native/SwiftUIRootNativeComponent";

type EventHandler = (...props: any[]) => void;
type EventRegistry = Map<string, Map<string, EventHandler>>;
type NodeRegistry = Map<string, { node: ViewTreeNode; parentId?: string }>;

interface SwiftUIContextType {
  nativeRef: React.RefObject<React.ElementRef<typeof SwiftUIRootNativeComponent> | null>;
  registerEventHandler: (id: string, name: string, handler: EventHandler) => void;
  getEventHandler: (id: string, name: string) => EventHandler | undefined;
  registerNode: (node: ViewTreeNode, parentId: string) => void;
  unregisterNode: (id: string) => void;
  getNodes: () => NodeRegistry;
  updateNodeProps: (id: string, props: Record<string, any>) => void;
}

const SwiftUIContext = createContext<SwiftUIContextType | undefined>(undefined);

export const SwiftUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const eventRegistry = useRef<EventRegistry>(new Map());
  const nodeRegistry = useRef<NodeRegistry>(new Map());

  const registerEventHandler = useCallback((id: string, name: string, handler: EventHandler) => {
    let handlersForId = eventRegistry.current.get(id);
    if (!handlersForId) {
      handlersForId = new Map<string, EventHandler>();
      eventRegistry.current.set(id, handlersForId);
    }
    handlersForId.set(name, handler);
  }, []);

  const getEventHandler = (id: string, name: string) => {
    return eventRegistry.current.get(id)?.get(name);
  };

  const registerNode = useCallback((node: ViewTreeNode, parentId?: string) => {
    console.log(`Registering node with id=${node.id}`, { node, parentId });
    nodeRegistry.current.set(node.id, { node, parentId });
  }, []);

  const unregisterNode = useCallback((id: string) => {
    console.log(`Unregistering node with id=${id}`);
    nodeRegistry.current.delete(id);
    eventRegistry.current.delete(id);
  }, []);

  const getNodes = () => nodeRegistry.current;

  const nativeRef = useRef<React.ElementRef<typeof SwiftUIRootNativeComponent> | null>(null);

  const updateNodeProps = useCallback((id: string, props: Record<string, any>) => {
    if (!nativeRef.current) {
      console.warn("Native ref not available");
      return;
    }
    const node = nodeRegistry.current.get(id);
    if (!node) {
      console.warn(`Node with id=${id} not found`);
      return;
    }
    console.log(`Updating node with id=${id}`, { props });
    node.node.props = { ...node.node.props, ...props };
    NativeSwiftUIRootCommands.updateChildProps(nativeRef.current, id, JSON.stringify(props));
  }, []);

  const context = {
    nativeRef,
    registerEventHandler,
    getEventHandler,
    registerNode,
    unregisterNode,
    updateNodeProps,
    getNodes,
  };

  return <SwiftUIContext.Provider value={context}>{children}</SwiftUIContext.Provider>;
};

export const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  return context;
};
