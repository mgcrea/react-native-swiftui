import React, { createContext, type FunctionComponent, useContext, useMemo } from "react";

type SwiftUIParentContextValue = {
  parentId: string;
};

const SwiftUIParentContext = createContext<SwiftUIParentContextValue | undefined>(undefined);

type SwiftUIParentIdProviderProps = {
  id: string;
  children: React.ReactNode;
};

export const SwiftUIParentIdProvider: FunctionComponent<SwiftUIParentIdProviderProps> = ({ id, children }) => {
  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      parentId: id,
    }),
    [id],
  );
  return <SwiftUIParentContext.Provider value={contextValue}>{children}</SwiftUIParentContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSwiftUIParentContext = () => {
  const context = useContext(SwiftUIParentContext);
  // No error thrown - allow usage outside provider, defaulting to undefined
  return context ?? { parentId: "" };
};
