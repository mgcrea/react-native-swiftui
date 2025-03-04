// SwiftUIContext.tsx
import React, { createContext, useContext, useRef } from "react";

type OnChangeHandler = (value: string) => void;
type EventRegistry = Map<string, OnChangeHandler>;

interface SwiftUIContextType {
  registerEventHandler: (id: string, handler: OnChangeHandler) => void;
  getEventHandler: (id: string) => OnChangeHandler | undefined;
}

const SwiftUIContext = createContext<SwiftUIContextType | undefined>(undefined);

export const SwiftUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const eventRegistry = useRef<EventRegistry>(new Map());

  const registerEventHandler = (id: string, handler: OnChangeHandler) => {
    eventRegistry.current.set(id, handler);
  };

  const getEventHandler = (id: string) => {
    return eventRegistry.current.get(id);
  };

  return (
    <SwiftUIContext.Provider value={{ registerEventHandler, getEventHandler }}>
      {children}
    </SwiftUIContext.Provider>
  );
};

const useSwiftUIContext = () => {
  const context = useContext(SwiftUIContext);
  if (!context) {
    throw new Error("useSwiftUIContext must be used within a SwiftUIProvider");
  }
  return context;
};
