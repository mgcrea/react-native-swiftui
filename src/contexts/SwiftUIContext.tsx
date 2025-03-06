import React, { createContext, useContext, useRef } from "react";

type EventHandler = (...props: any[]) => void;
type EventRegistry = Map<string, Map<string, EventHandler>>; // id -> eventName -> handler
// type ValueRegistry = Map<string, any>;

interface SwiftUIContextType {
  registerEventHandler: (
    id: string,
    name: string,
    handler: EventHandler
  ) => void;
  getEventHandler: (id: string, name: string) => EventHandler | undefined;
  // registerValue: (id: string, key: string, value: any) => void;
  // getValue: (id: string, key: string) => any;
}

const SwiftUIContext = createContext<SwiftUIContextType | undefined>(undefined);

export const SwiftUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const eventRegistry = useRef<EventRegistry>(new Map());

  const registerEventHandler = (
    id: string,
    name: string,
    handler: EventHandler
  ) => {
    let handlersForId = eventRegistry.current.get(id);
    console.log(`registerEventHandler ${id} ${name}`);
    if (!handlersForId) {
      handlersForId = new Map<string, EventHandler>();
      eventRegistry.current.set(id, handlersForId);
    }
    handlersForId.set(name, handler);
  };

  const getEventHandler = (id: string, name: string) => {
    console.log(`getEventHandler ${id} ${name}`);
    return eventRegistry.current.get(id)?.get(name);
  };

  return (
    <SwiftUIContext.Provider value={{ registerEventHandler, getEventHandler }}>
      {children}
    </SwiftUIContext.Provider>
  );
};

export const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) {
    throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  }
  return context;
};
