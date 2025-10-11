import { useSwiftUINode } from "../../hooks";
import type { FunctionComponentWithId } from "../../types";

// https://developer.apple.com/documentation/swiftui/spacer
export type NativeSpacerProps = {
  minLength?: number; // Optional minimum length of the spacer
};

export const Spacer: FunctionComponentWithId<NativeSpacerProps> = ({ ...props }) => {
  useSwiftUINode("Spacer", props);
  return null;
};
Spacer.displayName = "Spacer";
