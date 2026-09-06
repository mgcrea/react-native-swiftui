import type { FunctionComponentWithId, NativeTextStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

export type NativeTextProps = NativeTextStyleProps & {
  text: string;
  alignment?: "leading" | "center" | "trailing";
};

export const Text: FunctionComponentWithId<NativeTextProps> = createNodeComponent<NativeTextProps>("Text");
