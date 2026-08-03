import { jest } from "@jest/globals";
import React, { forwardRef } from "react";

/**
 * Jest mock for `react-native-nitro-modules`.
 *
 * The real module resolves the `NitroModules` TurboModule at import time, which
 * throws outside a native runtime. Because `getHostComponent(...)` is called at
 * the top level of every component file, that throw happens while `src/index.ts`
 * is still being evaluated — so without this, no test can import the package at
 * all, however unrelated to native the code under test is.
 *
 * Jest picks this up automatically for node_modules packages; no `jest.mock`
 * call is needed.
 */

/** Records every host component created, keyed by the nitro view name. */
export const hostComponents = new Map<string, unknown>();

/**
 * Latest props each host component rendered with, keyed by nitro view name.
 * Lets a test invoke `onEvent` the way the native side would.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lastProps = new Map<string, Record<string, any>>();

/** Dispatches an event as the native root would, for a given node id. */
export const emitNativeEvent = (name: string, value: string, type: string, id: string) => {
  const onEvent = lastProps.get("SwiftUIRootView")?.onEvent as
    | ((name: string, value: string, type: string, id: string) => void)
    | undefined;
  if (!onEvent) {
    throw new Error("No SwiftUIRootView rendered, cannot emit a native event");
  }
  onEvent(name, value, type, id);
};

/** Hybrid instances handed to `hybridRef`, so tests can assert on bridge calls. */
export type MockHybrid = {
  updateChildProps: ReturnType<typeof jest.fn<(id: string, props: string) => void>>;
};

export const hybridInstances: MockHybrid[] = [];

export const resetNitroMocks = () => {
  hostComponents.clear();
  lastProps.clear();
  hybridInstances.length = 0;
};

// The real `callback` marks a function for the native bridge; identity is enough
// here, and keeping it identity-stable matters because the components rely on
// referential stability of the wrapped handlers.
export const callback = <T,>(fn: T): T => fn;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHostComponent = <Props extends Record<string, any>, Methods>(
  name: string,
  _viewConfigGetter: unknown,
) => {
  const Component = forwardRef<Methods, Props>((props, _ref) => {
    const { children, hybridRef } = props as Props & {
      children?: React.ReactNode;
      hybridRef?: (hybrid: MockHybrid) => void;
    };

    lastProps.set(name, props);

    // Mirrors the native view attaching: `hybridRef` fires after mount, not
    // during render, which is exactly why prop updates can arrive before it.
    React.useEffect(() => {
      if (!hybridRef) {
        return;
      }
      const hybrid: MockHybrid = { updateChildProps: jest.fn() };
      hybridInstances.push(hybrid);
      hybridRef(hybrid);
    }, [hybridRef]);

    return React.createElement(React.Fragment, null, children);
  });
  Component.displayName = `Mock(${name})`;
  hostComponents.set(name, Component);
  return Component;
};

export type ViewConfig<Props, Methods> = { props: Props; methods: Methods };
export type ReactNativeView<Props, Methods> = React.ComponentType<Props & { ref?: unknown }>;
export type HybridObject = Record<string, unknown>;
