import { deepEqual } from "../hooks/useDeepMemo";

/**
 * The keys of `next` whose values differ from `prev`, plus every key that was in
 * `prev` and is gone from `next` (as `undefined`, which the serializer turns into
 * the `null` sentinel the Swift merge needs to clear a value).
 *
 * `useSwiftUINode` used to ship the entire prop bag on any change, so one typed
 * character re-serialized `style`, `labelStyle`, `options` and every other prop,
 * and the Swift side decoded a full props object to merge one field.
 */
export const diffProps = (
  prev: Record<string, unknown>,
  next: Record<string, unknown>,
): Record<string, unknown> => {
  const diff: Record<string, unknown> = {};
  for (const key of Object.keys(next)) {
    if (!deepEqual(prev[key], next[key])) {
      diff[key] = next[key];
    }
  }
  for (const key of Object.keys(prev)) {
    if (!(key in next)) {
      diff[key] = undefined;
    }
  }
  return diff;
};
