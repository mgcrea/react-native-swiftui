import type { PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../../contexts";
import { useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId } from "../../types";

// https://developer.apple.com/documentation/swiftui/view/sheet(ispresented:ondismiss:content:)

export type NativeSheetDetent = "medium" | "large" | `fraction:${number}` | `height:${number}`;

export type NativeSheetProps = {
  isPresented?: boolean;
  detents?: NativeSheetDetent[];
  title?: string;
  message?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
};

export type NativeSheetEvents = {
  onDismiss?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

export type SheetProps = NativeSheetProps & NativeSheetEvents;

export const Sheet: FunctionComponentWithId<PropsWithChildren<SheetProps>> = ({
  children,
  onDismiss,
  onPrimaryAction,
  onSecondaryAction,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Sheet", otherProps, {
    dismiss: onDismiss,
    primaryAction: onPrimaryAction,
    secondaryAction: onSecondaryAction,
  });
  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Sheet.displayName = "Sheet";
