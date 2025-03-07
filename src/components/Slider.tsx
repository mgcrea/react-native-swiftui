import { useId, useEffect } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { FunctionComponentWithId } from "src/types";

export type NativeSliderProps = {
  value: number;
  minimum?: number;
  maximum?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
};

export const Slider: FunctionComponentWithId<NativeSliderProps> = ({
  id,
  onChange,
  value: initialValue,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode, unregisterNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `slider:${useId()}`;

  useEffect(() => {
    if (onChange) {
      registerEventHandler(effectiveId, "change", (value: string) => {
        const numValue = parseFloat(value);
        console.log({ value, numValue });
        onChange(numValue);
      });
    }
  }, [onChange, effectiveId, registerEventHandler]);

  useEffect(() => {
    registerNode(
      {
        type: "Slider",
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
Slider.displayName = "Slider";
