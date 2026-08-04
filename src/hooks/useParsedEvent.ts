import { useMemo } from "react";

/**
 * Adapts a native event handler to a typed one.
 *
 * Events cross the bridge as strings (see `EventHandler` in the context), so
 * every component exposing a non-string `onChange` wrapped it by hand in the
 * same `useMemo(() => fn ? (v) => fn(parse(v)) : undefined, [fn])` shape — seven
 * near-identical copies whose only real difference was the one-line parse.
 *
 * `parse` is a real dependency rather than a suppressed one: every parser below
 * is defined at module level, so the identity is stable and the memo does not
 * churn.
 */
export const useParsedEvent = <T>(
  parse: (value: string) => T,
  handler: ((value: T) => void) | undefined,
): ((value: string) => void) | undefined =>
  useMemo(() => (handler ? (value: string) => handler(parse(value)) : undefined), [handler, parse]);

export const parseNumber = (value: string): number => parseFloat(value);

/** `parseFloat`, but an unparseable value becomes null rather than a NaN prop. */
export const parseNumberOrNull = (value: string): number | null => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

export const parseBoolean = (value: string): boolean => value === "true";

/** Falls back to now, matching the previous inline behaviour for a bad date. */
export const parseDate = (value: string): Date => {
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

/**
 * Native echoes back the value of the option the user picked, so the only work
 * is narrowing it to the caller's option union.
 */
export const castToOptionValue = <T extends string>(value: string): T => value as T;

/**
 * Native sends selections as a JSON array. This used to be an unguarded
 * `JSON.parse`, so a malformed payload threw inside event dispatch.
 */
export const parseJsonArray = <T>(value: string): T[] => {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};
