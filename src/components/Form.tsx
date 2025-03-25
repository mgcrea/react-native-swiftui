import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeFormProps = {
  style?: NativeViewStyle;
};

export const Form: FunctionComponentWithId<PropsWithChildren<NativeFormProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Form", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Form.displayName = "Form";
