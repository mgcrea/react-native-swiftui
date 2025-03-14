import { type PropsWithChildren } from "react";
import { SwiftUIParentIdProvider } from "../contexts";
import { useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId } from "../types";

// https://developer.apple.com/documentation/swiftui/form

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NativeFormProps = {};

export const Form: FunctionComponentWithId<PropsWithChildren<NativeFormProps>> = ({
  children,
  ...otherProps
}) => {
  const { id } = useSwiftUINode("Form", otherProps);

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Form.displayName = "Form";
