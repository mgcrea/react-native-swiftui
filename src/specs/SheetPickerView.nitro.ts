/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { HybridView, HybridViewMethods, HybridViewProps } from "react-native-nitro-modules";

export interface SheetPickerViewProps extends HybridViewProps {
  isPresented?: boolean;
  title?: string;
  searchPlaceholder?: string;
  selectedValue?: string;
  options?: SheetPickerViewOption[];
  autoDismiss?: boolean;
  onNativeSelect?: (value: string) => void;
  onNativeDismiss?: () => void;
}

export interface SheetPickerViewOption {
  label?: string;
  value: string;
}

export interface SheetPickerViewMethods extends HybridViewMethods {}

export type SheetPickerView = HybridView<SheetPickerViewProps, SheetPickerViewMethods, { ios: "swift" }>;
