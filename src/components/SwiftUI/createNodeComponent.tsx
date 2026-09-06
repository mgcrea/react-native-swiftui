import type { ReactNode } from "react";
import type { StyleProp } from "react-native";

import { SwiftUIParentIdProvider } from "../../contexts";
import { castToOptionValue, useNormalizedStyles, useParsedEvent, useSwiftUINode } from "../../hooks";
import type { SwiftUINodeProps } from "../../hooks/useSwiftUINode";
import type { FunctionComponentWithId, NativeTextStyle, NativeViewStyle, WithId } from "../../types";

/** The props every node component may carry; each concrete `TProps` picks a subset. */
type NodeComponentProps<TValue> = {
  style?: StyleProp<NativeTextStyle | NativeViewStyle>;
  labelStyle?: StyleProp<NativeTextStyle>;
  onChange?: (value: TValue) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  children?: ReactNode;
};

export type NodeComponentOptions<TValue> = {
  /** Turns the string native sends into the typed value `onChange` receives. */
  parse?: (value: string) => TValue;
  /** Provides the node's id as the parent for its children. */
  container?: boolean;
  displayName?: string;
};

/**
 * Builds a component that registers a node: normalizes `style` and `labelStyle`,
 * adapts `onChange` through `parse`, maps the three standard events, and either
 * returns nothing or provides its id to its children.
 *
 * Fifteen components hand-wrote this body, and seven more went through a
 * container-only factory. The prop *types* still differ per component, which is
 * why this is generic over `TProps` rather than a shared props type.
 *
 * Components with real per-prop work keep their own body: Picker and
 * MultiPicker normalize options, Image resolves an asset source, Slider debounces,
 * Button and Sheet have non-standard event names.
 */
export const createNodeComponent = <TProps extends object, TValue = string>(
  type: string,
  options: NodeComponentOptions<TValue> = {},
): FunctionComponentWithId<TProps> => {
  const {
    parse = castToOptionValue as (value: string) => TValue,
    container = false,
    displayName = type,
  } = options;

  const Component: FunctionComponentWithId<TProps> = (props) => {
    const { children, style, labelStyle, onChange, onFocus, onBlur, ...otherProps } = props as WithId<TProps> &
      NodeComponentProps<TValue>;
    const normalizedStyle = useNormalizedStyles(style);
    const normalizedLabelStyle = useNormalizedStyles(labelStyle);
    const change = useParsedEvent(parse, onChange);

    const { id } = useSwiftUINode(
      type,
      { ...otherProps, style: normalizedStyle, labelStyle: normalizedLabelStyle } as SwiftUINodeProps,
      { change, focus: onFocus, blur: onBlur },
    );

    return container ? <SwiftUIParentIdProvider id={id}>{children}</SwiftUIParentIdProvider> : null;
  };
  Component.displayName = displayName;
  return Component;
};
