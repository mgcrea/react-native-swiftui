import { PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/view/sheet(ispresented:ondismiss:content:)

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
  const { id } = useSwiftUINode("Sheet", otherProps, { dismiss: onDismiss });
  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Sheet.displayName = "Sheet";
