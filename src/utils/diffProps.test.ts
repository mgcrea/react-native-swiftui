import { describe, expect, it } from "@jest/globals";

import { diffProps } from "./diffProps";

describe("diffProps", () => {
  it("returns only the keys whose value changed", () => {
    expect(diffProps({ a: 1, b: 2, c: "x" }, { a: 1, b: 3, c: "x" })).toEqual({ b: 3 });
  });

  it("compares nested values structurally", () => {
    const style = { color: "red", padding: 4 };
    expect(diffProps({ style }, { style: { color: "red", padding: 4 } })).toEqual({});
    expect(diffProps({ style }, { style: { color: "blue", padding: 4 } })).toEqual({
      style: { color: "blue", padding: 4 },
    });
  });

  it("reports a removed key as undefined so the serializer can send null", () => {
    expect(diffProps({ a: 1, maxLength: 10 }, { a: 1 })).toEqual({ maxLength: undefined });
    expect("maxLength" in diffProps({ a: 1, maxLength: 10 }, { a: 1 })).toBe(true);
  });

  it("reports a key that became undefined", () => {
    expect(diffProps({ maxLength: 10 }, { maxLength: undefined })).toEqual({ maxLength: undefined });
  });

  it("returns an empty object when nothing changed", () => {
    expect(diffProps({ a: [1, 2], d: new Date(0) }, { a: [1, 2], d: new Date(0) })).toEqual({});
  });
});
