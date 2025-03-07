import { useId, useEffect } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";
import { useJsonMemo } from "../hooks";

export type NativeButtonProps = {
  title: string;
  onPress?: () => void;
};

export const Button: FunctionComponentWithId<NativeButtonProps> = ({ id, onPress, ...otherProps }) => {
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `button-${useId()}`;

  useEffect(() => {
    if (onPress) registerEventHandler(effectiveId, "press", onPress);
  }, [onPress, effectiveId, registerEventHandler]);

  const memoizedProps = useJsonMemo(otherProps);
  useEffect(() => {
    registerNode(
      {
        type: "Button",
        id: effectiveId,
        props: memoizedProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, memoizedProps, parentId, registerNode, unregisterNode]);

  return null;
};
Button.displayName = "Button";
