import { useMemo } from "react";

export function useJsonMemo<T extends Record<string, unknown>>(obj: T): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({ ...obj }), [JSON.stringify(obj)]);
}
