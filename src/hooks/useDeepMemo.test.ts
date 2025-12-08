import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react-native";
import { useDeepMemo } from "./useDeepMemo";

describe("useDeepMemo", () => {
  describe("reference stability", () => {
    it("should return the same reference for equal objects", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { a: 1, b: 2 } },
      });

      const firstRef = result.current;
      rerender({ obj: { a: 1, b: 2 } });

      expect(result.current).toBe(firstRef);
    });

    it("should return a new reference when object changes", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { a: 1 } },
      });

      const firstRef = result.current;
      rerender({ obj: { a: 2 } });

      expect(result.current).not.toBe(firstRef);
      expect(result.current).toEqual({ a: 2 });
    });
  });

  describe("deep equality - primitives", () => {
    it("should detect changes in primitive values", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { str: "hello", num: 42, bool: true } },
      });

      const firstRef = result.current;

      // Same values - same reference
      rerender({ obj: { str: "hello", num: 42, bool: true } });
      expect(result.current).toBe(firstRef);

      // Different string - new reference
      rerender({ obj: { str: "world", num: 42, bool: true } });
      expect(result.current).not.toBe(firstRef);
    });

    it("should handle null and undefined values", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { a: null, b: undefined } as Record<string, unknown> },
      });

      const firstRef = result.current;

      rerender({ obj: { a: null, b: undefined } });
      expect(result.current).toBe(firstRef);

      rerender({ obj: { a: undefined, b: null } });
      expect(result.current).not.toBe(firstRef);
    });
  });

  describe("deep equality - nested objects", () => {
    it("should detect changes in nested objects", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { style: { color: "red", size: 10 } } },
      });

      const firstRef = result.current;

      // Same nested values - same reference
      rerender({ obj: { style: { color: "red", size: 10 } } });
      expect(result.current).toBe(firstRef);

      // Different nested value - new reference
      rerender({ obj: { style: { color: "blue", size: 10 } } });
      expect(result.current).not.toBe(firstRef);
    });

    it("should handle deeply nested objects", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { a: { b: { c: { d: 1 } } } } },
      });

      const firstRef = result.current;

      rerender({ obj: { a: { b: { c: { d: 1 } } } } });
      expect(result.current).toBe(firstRef);

      rerender({ obj: { a: { b: { c: { d: 2 } } } } });
      expect(result.current).not.toBe(firstRef);
    });
  });

  describe("deep equality - arrays", () => {
    it("should detect changes in arrays", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { items: [1, 2, 3] } },
      });

      const firstRef = result.current;

      // Same array values - same reference
      rerender({ obj: { items: [1, 2, 3] } });
      expect(result.current).toBe(firstRef);

      // Different array values - new reference
      rerender({ obj: { items: [1, 2, 4] } });
      expect(result.current).not.toBe(firstRef);
    });

    it("should detect array length changes", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { items: [1, 2] } },
      });

      const firstRef = result.current;

      rerender({ obj: { items: [1, 2, 3] } });
      expect(result.current).not.toBe(firstRef);
    });

    it("should handle arrays of objects", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { items: [{ id: 1 }, { id: 2 }] } },
      });

      const firstRef = result.current;

      rerender({ obj: { items: [{ id: 1 }, { id: 2 }] } });
      expect(result.current).toBe(firstRef);

      rerender({ obj: { items: [{ id: 1 }, { id: 3 }] } });
      expect(result.current).not.toBe(firstRef);
    });
  });

  describe("deep equality - Date objects", () => {
    it("should compare Date objects by time value", () => {
      const date1 = new Date("2024-01-15T10:00:00Z");
      const date2 = new Date("2024-01-15T10:00:00Z");
      const date3 = new Date("2024-01-16T10:00:00Z");

      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { selection: date1 } as Record<string, unknown> },
      });

      const firstRef = result.current;

      // Same time value (different Date instance) - same reference
      rerender({ obj: { selection: date2 } });
      expect(result.current).toBe(firstRef);

      // Different time value - new reference
      rerender({ obj: { selection: date3 } });
      expect(result.current).not.toBe(firstRef);
    });

    it("should detect Date vs non-Date", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { value: new Date("2024-01-15") } as Record<string, unknown> },
      });

      const firstRef = result.current;

      // Date replaced with string - new reference
      rerender({ obj: { value: "2024-01-15" } });
      expect(result.current).not.toBe(firstRef);
    });
  });

  describe("key changes", () => {
    it("should detect added keys", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { a: 1 } as Record<string, unknown> },
      });

      const firstRef = result.current;

      rerender({ obj: { a: 1, b: 2 } });
      expect(result.current).not.toBe(firstRef);
    });

    it("should detect removed keys", () => {
      const { result, rerender } = renderHook(({ obj }) => useDeepMemo(obj), {
        initialProps: { obj: { a: 1, b: 2 } as Record<string, unknown> },
      });

      const firstRef = result.current;

      rerender({ obj: { a: 1 } });
      expect(result.current).not.toBe(firstRef);
    });
  });
});
