import type { PropsWithChildren } from "react";

import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/zstack
export type NativeZStackProps = NativeViewStyleProps & {
  alignment?:
    | "topLeading"
    | "top"
    | "topTrailing"
    | "leading"
    | "center"
    | "trailing"
    | "bottomLeading"
    | "bottom"
    | "bottomTrailing";
};

export const ZStack = createNodeComponent<PropsWithChildren<NativeZStackProps>>("ZStack", { container: true });
