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
