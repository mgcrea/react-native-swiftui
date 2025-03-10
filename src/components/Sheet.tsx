// src/components/Sheet.tsx
import { PropsWithChildren, useEffect } from "react";
import { SwiftUIParentIdProvider, useSwiftUIContext } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

export type NativeSheetDetent = "medium" | "large" | `fraction:${number}` | `height:${number}`;

export type NativeSheetProps = {
  isPresented?: boolean;
  detents?: NativeSheetDetent[];
  onDismiss?: () => void;
};

export const Sheet: FunctionComponentWithId<PropsWithChildren<NativeSheetProps>> = ({
  children,
  onDismiss,
  ...otherProps
}) => {
  const { registerEventHandler } = useSwiftUIContext();
  const { id } = useSwiftUINode("Sheet", { ...otherProps });

  useEffect(() => {
    if (onDismiss) {
      registerEventHandler(id, "dismiss", onDismiss);
    }
  }, [id, onDismiss, registerEventHandler]);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Sheet.displayName = "Sheet";
