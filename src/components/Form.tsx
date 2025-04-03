import { type PropsWithChildren } from "react";
import { StyleProp } from "react-native";
import { SwiftUIParentIdProvider } from "../contexts";
import { useNormalizedStyles, useSwiftUINode } from "../hooks";
import type { FunctionComponentWithId, NativeViewStyle } from "../types";

// https://developer.apple.com/documentation/swiftui/form

export type NativeFormProps = {
  style?: StyleProp<NativeViewStyle>;
};

export const Form: FunctionComponentWithId<PropsWithChildren<NativeFormProps>> = ({
  children,
  style,
  ...otherProps
}) => {
  const normalizedStyle = useNormalizedStyles<NativeViewStyle>(style);

  const { id } = useSwiftUINode("Form", { style: normalizedStyle, ...otherProps });

  return <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider>;
};
Form.displayName = "Form";
