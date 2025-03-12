import type { NativeViewStyle } from "./style";

export type GridItemConfig = {
  type: "fixed" | "flexible" | "adaptive";
  fixed?: number;
  minimum?: number;
  maximum?: number;
  spacing?: number;
  alignment?: "leading" | "center" | "trailing";
};

export type NativeLazyVGridProps = {
  columns: GridItemConfig[];
  spacing?: number;
  alignment?: "leading" | "center" | "trailing";
  style?: NativeViewStyle;
};
