/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { HybridView, HybridViewMethods, HybridViewProps } from "react-native-nitro-modules";

export interface PickerViewProps extends HybridViewProps {
  value?: string;
  selection?: string;
  label?: string;
  labelColor?: string;
  options?: PickerViewOption[];
  pickerStyle?: string;
  controlSize?: string;
  disabled?: boolean;
  onNativeChange?: (value: string) => void;
}

export interface PickerViewOption {
  value: string;
  label?: string;
  icon?: string;
}

export interface PickerViewMethods extends HybridViewMethods {}

export type PickerView = HybridView<PickerViewProps, PickerViewMethods, { ios: "swift" }>;
