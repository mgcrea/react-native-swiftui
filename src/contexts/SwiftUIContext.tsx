// src/contexts/SwiftUIContext.tsx
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import type { ViewTreeNode } from "src/types";

type EventHandler = (...props: any[]) => void;
type EventRegistry = Map<string, Map<string, EventHandler>>;
type NodeRegistry = Map<string, { node: ViewTreeNode; parentId?: string }>;

interface SwiftUIContextType {
  registerEventHandler: (id: string, name: string, handler: EventHandler) => void;
  getEventHandler: (id: string, name: string) => EventHandler | undefined;
  registerNode: (node: ViewTreeNode, parentId: string) => void;
  unregisterNode: (id: string) => void;
  getNodes: () => NodeRegistry;
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

  const context = {
    registerEventHandler,
    getEventHandler,
    registerNode,
    unregisterNode,
    getNodes,
  };

  return <SwiftUIContext.Provider value={context}>{children}</SwiftUIContext.Provider>;
};

export const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  return context;
};
