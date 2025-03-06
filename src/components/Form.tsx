import { type PropsWithChildren } from "react";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeFormProps = {};

export const Form: IdentifiableFunctionComponent<
  PropsWithChildren<NativeFormProps>
> = ({ id, children }) => {
  return <>{children}</>;
};
Form.displayName = "Form";
