import { useMemo } from "react";

export function useJsonMemo<T extends Record<string, any>>(obj: T): T {
  return useMemo(() => ({ ...obj }), [JSON.stringify(obj)]);
}
