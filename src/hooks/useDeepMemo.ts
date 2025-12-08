import { useRef } from "react";

/**
 * Deep equality check for objects.
 * Handles nested objects like `style` props correctly.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a === null || b === null) return false;

  // Handle Date objects - compare by time value
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  // One is Date, one is not
  if (a instanceof Date || b instanceof Date) return false;

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // One is array, one is not
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Memoizes an object using deep equality comparison.
 * Returns the same reference if the object hasn't changed.
 */
export function useDeepMemo<T extends Record<string, unknown>>(obj: T): T {
  const ref = useRef<T | null>(null);
  ref.current ??= obj;

  if (!deepEqual(ref.current, obj)) {
    ref.current = { ...obj };
  }

  return ref.current;
}
