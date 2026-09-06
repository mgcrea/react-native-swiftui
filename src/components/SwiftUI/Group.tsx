import type { PropsWithChildren } from "react";

import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/group

export type NativeGroupProps = NativeViewStyleProps;

export const Group = createNodeComponent<PropsWithChildren<NativeGroupProps>>("Group", { container: true });
