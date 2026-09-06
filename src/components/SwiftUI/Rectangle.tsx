import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/rectangle

export type NativeRectangleProps = NativeViewStyleProps;

export const Rectangle = createNodeComponent<NativeRectangleProps>("Rectangle");
