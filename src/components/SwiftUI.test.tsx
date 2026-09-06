import { describe, expect, it, jest } from "@jest/globals";
import { act, render } from "@testing-library/react-native";

// Imported by path, not by package specifier: jest substitutes this file for
// `react-native-nitro-modules` and keys its registry by resolved path, so this is
// the same instance the components get — while `tsc` still sees the real types.
import { emitNativeEvent, hybridInstances } from "../../__mocks__/react-native-nitro-modules";
import { SwiftUI } from "./SwiftUI";

/** Every payload pushed across the bridge for a given node id. */
const propsSentFor = (id: string) =>
  hybridInstances
    .flatMap((hybrid) => hybrid.updateChildProps.mock.calls)
    .filter(([nodeId]) => nodeId === id)
    .map(([, json]) => JSON.parse(json) as Record<string, unknown>);

describe("SwiftUI", () => {
  // Picker and MultiPicker were the only 2 of 22 components whose props type
  // omitted `id`. The runtime already carried it through `...otherProps`; the gap
  // was type-level, so this asserts both halves at once — it would not compile
  // without the type, and would not pass without the runtime path.
  it.each([
    [
      "Picker",
      "picker-id",
      (selection: string) => (
        <SwiftUI.Picker
          id="picker-id"
          selection={selection}
          options={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
          ]}
        />
      ),
    ],
    [
      "MultiPicker",
      "multi-id",
      (selection: string) => (
        <SwiftUI.MultiPicker id="multi-id" components={[{ options: ["a", "b"] }]} selections={[selection]} />
      ),
    ],
  ])("honours an explicit id on %s", (_name, expectedId, renderWith) => {
    const { rerender } = render(<SwiftUI>{renderWith("a")}</SwiftUI>);
    // The prop has to actually change: useDeepMemo short-circuits an identical
    // re-render, so no update — and no node id — would cross the bridge at all.
    rerender(<SwiftUI>{renderWith("b")}</SwiftUI>);

    const ids = hybridInstances.flatMap((hybrid) =>
      hybrid.updateChildProps.mock.calls.map(([nodeId]) => nodeId),
    );
    expect(ids).toContain(expectedId);
  });

  it("sends prop updates for a child node across the bridge", () => {
    const { rerender } = render(
      <SwiftUI>
        <SwiftUI.TextField id="field" text="before" />
      </SwiftUI>,
    );

    rerender(
      <SwiftUI>
        <SwiftUI.TextField id="field" text="after" />
      </SwiftUI>,
    );

    expect(propsSentFor("field")).toContainEqual(expect.objectContaining({ text: "after" }));
  });

  it("sends only the keys that changed", () => {
    const { rerender } = render(
      <SwiftUI>
        <SwiftUI.TextField id="field" text="before" label="Name" style={{ color: "red" }} />
      </SwiftUI>,
    );

    rerender(
      <SwiftUI>
        <SwiftUI.TextField id="field" text="after" label="Name" style={{ color: "red" }} />
      </SwiftUI>,
    );

    expect(propsSentFor("field")).toEqual([{ text: "after" }]);
  });

  it("attaches a single hybrid ref across re-renders", () => {
    const { rerender } = render(
      <SwiftUI>
        <SwiftUI.Text text="a" />
      </SwiftUI>,
    );
    rerender(
      <SwiftUI>
        <SwiftUI.Text text="b" />
      </SwiftUI>,
    );

    // An inline `callback(...)` handed the native view a new hybridRef wrapper
    // on every render, and the mock mirrors that with one instance per call.
    expect(hybridInstances).toHaveLength(1);
  });

  it("sends null rather than omitting a prop that becomes undefined", () => {
    const { rerender } = render(
      <SwiftUI>
        <SwiftUI.TextField id="field" text="x" maxLength={10} />
      </SwiftUI>,
    );

    rerender(
      <SwiftUI>
        <SwiftUI.TextField id="field" text="x" maxLength={undefined} />
      </SwiftUI>,
    );

    const cleared = propsSentFor("field").filter((props) => "maxLength" in props);
    expect(cleared.length).toBeGreaterThan(0);
    expect(cleared.at(-1)?.maxLength).toBeNull();
  });

  it("keeps event handlers working after the node is re-parented", () => {
    const onChange = jest.fn();

    const { rerender } = render(
      <SwiftUI>
        <SwiftUI.Section id="a">
          <SwiftUI.TextField id="field" text="x" onChange={onChange} />
        </SwiftUI.Section>
      </SwiftUI>,
    );

    act(() => emitNativeEvent("change", "typed", "textField", "field"));
    expect(onChange).toHaveBeenCalledTimes(1);

    // Same node id, different parent. This re-runs the registration effect but
    // not the events effect, whose deps did not change.
    rerender(
      <SwiftUI>
        <SwiftUI.Section id="b">
          <SwiftUI.TextField id="field" text="x" onChange={onChange} />
        </SwiftUI.Section>
      </SwiftUI>,
    );

    // Previously the node cleanup deleted the handler and nothing re-registered
    // it, so this second event went nowhere.
    act(() => emitNativeEvent("change", "typed again", "textField", "field"));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith("typed again");
  });
});
