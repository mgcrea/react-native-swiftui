// src/contexts/SwiftUIParentContext.tsx
import React, { createContext, FunctionComponent, useContext, useMemo } from "react";

// Define the context type
interface SwiftUIParentContextType {
  parentId: string; // The ID of the parent component
}

// Create the context
const SwiftUIParentContext = createContext<SwiftUIParentContextType | undefined>(undefined);

// Provider component to set the parentId for a subtree
type SwiftUIParentProviderProps = {
  id: string;
  children: React.ReactNode;
};

export const SwiftUIParentIdProvider: FunctionComponent<SwiftUIParentProviderProps> = ({ id, children }) => {
  const parentContext = useContext(SwiftUIParentContext);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      parentId: id,
    }),
    [id],
  );

  return <SwiftUIParentContext.Provider value={contextValue}>{children}</SwiftUIParentContext.Provider>;
};

// Hook to access the parentId
export const useSwiftUIParentContext = () => {
  const context = useContext(SwiftUIParentContext);
  // No error thrown - allow usage outside provider, defaulting to undefined
  return context ?? { parentId: "" };
};
