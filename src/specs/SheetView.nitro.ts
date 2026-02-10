/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { HybridView, HybridViewMethods, HybridViewProps } from "react-native-nitro-modules";

export interface SheetViewProps extends HybridViewProps {
  isPresented?: boolean;
  detents?: string[];
  title?: string;
  message?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onNativeDismiss?: () => void;
  onNativePrimaryAction?: () => void;
  onNativeSecondaryAction?: () => void;
}

export interface SheetViewMethods extends HybridViewMethods {}

export type SheetView = HybridView<SheetViewProps, SheetViewMethods, { ios: "swift" }>;
