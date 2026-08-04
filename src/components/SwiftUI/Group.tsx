import type { NativeViewStyleProps } from "../../types";
import { createContainerComponent } from "./createContainerComponent";

// https://developer.apple.com/documentation/swiftui/group

export type NativeGroupProps = NativeViewStyleProps & {};

export const Group = createContainerComponent<NativeGroupProps>("Group");
