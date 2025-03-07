import { useEffect, useRef } from "react";

export const useDebugEffect = (deps: Record<string, unknown> = {}, comment?: string) => {
  const lastDeps = useRef({ ...deps });
  useEffect(() => {
    Object.keys(deps).forEach((dep) => {
      if (deps[dep] !== lastDeps.current[dep]) {
        console.log(
          `Dependency "${dep}" has changed, prevValue=%o, nextValue=%o! ${comment ? `(${comment})` : ""}`,
          lastDeps.current[dep],
          deps[dep],
        );
      }
    });
    lastDeps.current = { ...deps };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(deps));
};
