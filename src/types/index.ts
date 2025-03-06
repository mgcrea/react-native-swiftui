import type { FunctionComponent } from "react";

export type Identifiable<T> = T & { id?: string };
export type IdentifiableFunctionComponent<T> = FunctionComponent<Identifiable<T>>;

export type ViewTreeNode = {
  id: string;
  type: string;
  props?: Record<string, any>;
  children?: ViewTreeNode[];
};
