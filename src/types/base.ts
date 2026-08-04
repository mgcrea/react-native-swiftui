import type { FunctionComponent } from "react";

export type WithId<T = unknown> = T & { id?: string | undefined };
export type FunctionComponentWithId<T> = FunctionComponent<WithId<T>> & { displayName: string };

export type ViewTreeNode = {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: ViewTreeNode[];
};
