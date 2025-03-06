import { useId, useEffect, cloneElement } from "react";
import { useSwiftUIContext, useSwiftUIParentContext } from "../contexts";
import type { IdentifiableFunctionComponent } from "src/types";

// https://developer.apple.com/documentation/swiftui/picker

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

export type NativePickerProps = {
  selection?: string;
  label?: string;
  options?: string[];
  pickerStyle?: NativePickerStyle;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Picker: IdentifiableFunctionComponent<NativePickerProps> = ({
  id,
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { registerEventHandler, registerNode } = useSwiftUIContext();
  const { parentId } = useSwiftUIParentContext();
  const effectiveId = id || `picker:${useId()}`;

  useEffect(() => {
    if (onChange) registerEventHandler(effectiveId, "change", onChange);
    if (onFocus) registerEventHandler(effectiveId, "focus", onFocus);
    if (onBlur) registerEventHandler(effectiveId, "blur", onBlur);
  }, [onChange, onFocus, onBlur, effectiveId, registerEventHandler]);

  registerNode(
    {
      type: "Picker",
      id: effectiveId,
      props: otherProps,
    },
    parentId,
  );

  // Pass updated text to viewTree
  return null;
};
Picker.displayName = "Picker";
