import { describe, expect, it, jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-native";
import type { PropsWithChildren } from "react";

import { SwiftUIProvider, useSwiftUIContext, type SwiftUIContextValue } from "./SwiftUIContext";

/** Stands in for the native hybrid view, recording what crosses the bridge. */
const createHybrid = () => {
  const calls: { id: string; props: string }[] = [];
  return {
    calls,
    updateChildProps: (id: string, props: string) => {
      calls.push({ id, props });
    },
  };
};

const renderContext = () => {
  const wrapper = ({ children }: PropsWithChildren) => <SwiftUIProvider id="root">{children}</SwiftUIProvider>;
  return renderHook(() => useSwiftUIContext(), { wrapper });
};

const attach = (context: SwiftUIContextValue, hybrid: ReturnType<typeof createHybrid>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context.hybridRef.current = hybrid as any;
};

describe("updateNodeProps", () => {
  it("keeps the registry in sync when the hybrid ref is not attached yet", () => {
    const { result } = renderContext();

    act(() => {
      result.current.registerNode({ type: "textField", id: "a", props: { value: "initial" } }, "__root");
    });

    // hybridRef is set from a native callback that triggers no re-render, so an
    // update can legitimately land before it exists.
    act(() => {
      result.current.updateNodeProps("a", { value: "updated" });
    });

    expect(result.current.getNodes().get("a")?.node.props).toEqual({ value: "updated" });
  });

  it("flushes updates buffered before the hybrid ref attached", () => {
    const { result } = renderContext();
    const hybrid = createHybrid();

    act(() => {
      result.current.registerNode({ type: "textField", id: "a", props: {} }, "__root");
      result.current.updateNodeProps("a", { value: "early" });
    });

    expect(hybrid.calls).toHaveLength(0);

    act(() => {
      attach(result.current, hybrid);
      result.current.flushPendingProps();
    });

    expect(hybrid.calls).toEqual([{ id: "a", props: JSON.stringify({ value: "early" }) }]);
  });

  it("serializes undefined props as null so native can clear them", () => {
    const { result } = renderContext();
    const hybrid = createHybrid();

    act(() => {
      result.current.registerNode({ type: "textField", id: "a", props: { maxLength: 10 } }, "__root");
      attach(result.current, hybrid);
    });

    act(() => {
      result.current.updateNodeProps("a", { maxLength: undefined });
    });

    // JSON.stringify drops undefined keys, and the Swift merge skips absent
    // keys, so without a null sentinel the prop could never be cleared.
    expect(JSON.parse(hybrid.calls[0].props)).toEqual({ maxLength: null });
  });
});

describe("event registry", () => {
  it("preserves handlers when a node re-registers under a new parent", () => {
    const { result } = renderContext();
    const handler = jest.fn();

    act(() => {
      result.current.registerNode({ type: "button", id: "a", props: {} }, "parent-1");
      result.current.registerEvents("a", { press: handler });
    });

    expect(result.current.getEventHandler("a", "press")).toBe(handler);

    // Re-parenting re-runs the node effect (cleanup then register) but not the
    // events effect, which has different deps.
    act(() => {
      result.current.unregisterNode("a");
      result.current.registerNode({ type: "button", id: "a", props: {} }, "parent-2");
    });

    expect(result.current.getEventHandler("a", "press")).toBe(handler);
  });

  it("drops handlers once they are explicitly unregistered", () => {
    const { result } = renderContext();
    const handler = jest.fn();

    act(() => {
      result.current.registerNode({ type: "button", id: "a", props: {} }, "__root");
      result.current.registerEvents("a", { press: handler });
    });

    act(() => {
      result.current.unregisterEvents("a");
    });

    expect(result.current.getEventHandler("a", "press")).toBeUndefined();
  });
});
