import { useId, useEffect } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "../types";

export type NativeButtonProps = {
  title: string;
  onPress?: () => void;
};

export const Button: IdentifiableFunctionComponent<NativeButtonProps> = ({ id, onPress, ...otherProps }) => {
  const { registerEventHandler, registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `button-${useId()}`;

  useEffect(() => {
    if (onPress) registerEventHandler(effectiveId, "press", onPress);
  }, [onPress, effectiveId, registerEventHandler]);

  registerNode(
    {
      type: "Button",
      id: effectiveId,
      props: otherProps,
    },
    parentId,
  );

  return null;
};
Button.displayName = "Button";
