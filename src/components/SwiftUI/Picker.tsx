import { type ReactNode, useMemo } from "react";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { NativeLabelStyleProps, NativeTextStyle, NativeTextStyleProps } from "../../types";

// https://developer.apple.com/documentation/swiftui/picker

export type NativePickerStyle = "default" | "inline" | "menu" | "segmented" | "wheel";

export type NativePickerOption<T extends string> = {
  value: T;
  label: string;
  icon?: string;
};

export type NativePickerConfig = {
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};

const DEFAULT_PICKER_CONFIG = {
  min: 0,
  max: 100,
  step: 1,
  prefix: "",
  suffix: "",
} satisfies NativePickerConfig;

export type NativePickerProps<T extends string> = NativeTextStyleProps &
  NativeLabelStyleProps & {
    options?: readonly NativePickerOption<T>[];
    config?: NativePickerConfig;
    value?: T;
    selection?: T;
    label?: string;
    pickerStyle?: NativePickerStyle;
    disabled?: boolean;
    onChange?: (value: T) => void;
    onFocus?: () => void;
    onBlur?: () => void;
  };

export const Picker = <T extends string>({
  value,
  selection,
  options,
  config,
  onChange: onChangeProp,
  onFocus,
  onBlur,
  style,
  labelStyle,
  ...otherProps
}: NativePickerProps<T>): ReactNode => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (val: string) => {
            onChangeProp(val as T); // Cast string to T
          }
        : undefined,
    [onChangeProp],
  );

  // Prefer value over selection
  const resolvedSelection = value ?? selection;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
  const normalizedSelection = resolvedSelection ? String(resolvedSelection) : undefined;
  const normalizedConfig = useMemo(
    () =>
      config
        ? {
            ...DEFAULT_PICKER_CONFIG,
            ...config,
          }
        : undefined,
    [config],
  );

  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);
  const normalizedLabelStyle = useNormalizedStyles<NativeTextStyle>(labelStyle);

  useSwiftUINode(
    "Picker",
    {
      selection: normalizedSelection,
      options,
      config: normalizedConfig,
      style: normalizedStyles,
      labelStyle: normalizedLabelStyle,
      ...otherProps,
    },
    {
      change: onChange,
      focus: onFocus,
      blur: onBlur,
    },
  );
  return null;
};
Picker.displayName = "Picker";
