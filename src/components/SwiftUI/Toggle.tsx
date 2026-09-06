import { parseBoolean } from "../../hooks";
import type { NativeLabelStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

export type NativeToggleProps = NativeLabelStyleProps & {
  isOn: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle = createNodeComponent<NativeToggleProps, boolean>("Toggle", { parse: parseBoolean });
