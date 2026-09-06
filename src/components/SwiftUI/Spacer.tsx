import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/spacer
export type NativeSpacerProps = {
  minLength?: number; // Optional minimum length of the spacer
};

export const Spacer = createNodeComponent<NativeSpacerProps>("Spacer");
