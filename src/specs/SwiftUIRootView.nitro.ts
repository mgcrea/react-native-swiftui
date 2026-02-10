/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { HybridView, HybridViewMethods, HybridViewProps } from "react-native-nitro-modules";

export interface SwiftUIRootViewProps extends HybridViewProps {
  viewTree?: string;
  onEvent?: (name: string, value: string, type: string, id: string) => void;
}

export interface SwiftUIRootViewMethods extends HybridViewMethods {
  updateChildProps(identifier: string, props: string): void;
}

export type SwiftUIRootView = HybridView<SwiftUIRootViewProps, SwiftUIRootViewMethods, { ios: "swift" }>;
