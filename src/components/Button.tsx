import { useId, useEffect } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "../types";

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

  useEffect(() => {
    registerNode(
      {
        type: "Button",
        id: effectiveId,
        props: otherProps,
      },
      parentId,
    );
    return () => {
      unregisterNode(effectiveId);
    };
  }, [effectiveId, otherProps, parentId, registerNode, unregisterNode]);

  return null;
};
Button.displayName = "Button";
