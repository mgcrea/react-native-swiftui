import type { PropsWithChildren } from "react";

import type { NativeViewStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/form

export type NativeFormContentMargins = {
  top?: number;
  leading?: number;
  bottom?: number;
  trailing?: number;
};

export type NativeFormProps = NativeViewStyleProps & {
  disabled?: boolean;
  scrollDisabled?: boolean;
  contentMargins?: NativeFormContentMargins;
};

export const Form = createNodeComponent<PropsWithChildren<NativeFormProps>>("Form", { container: true });
