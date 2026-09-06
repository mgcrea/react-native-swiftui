import { useMemo } from "react";
import { callback } from "react-native-nitro-modules";

/**
 * `callback(fn)` for an optional handler, memoized on the handler.
 *
 * Nitro's `callback()` returns a fresh wrapper object each call, so an inline
 * `fn ? callback(fn) : undefined` re-set the native prop on every render.
 */
export const useNativeCallback = <T extends (...args: never[]) => void>(fn: T | undefined) =>
  useMemo(() => (fn ? callback(fn) : undefined), [fn]);
