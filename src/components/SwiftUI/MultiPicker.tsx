import { ReactNode, useMemo } from "react";
import { StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../../hooks";
import type { NativeTextStyle } from "../../types";
import { fillArray } from "../../utils";

// https://developer.apple.com/documentation/swiftui/picker

export type NativeMultiPickerOption<T extends string> = { value: T; label: string } | T;

export type NativeMultiPickerComponentConfig = {
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};

const DEFAULT_COMPONENT_CONFIG = {
  min: 0,
  max: 100,
  step: 1,
  prefix: "",
  suffix: "",
} satisfies NativeMultiPickerComponentConfig;

export type NativeMultiPickerComponent<T extends string> = {
  label?: string;
  options?: readonly NativeMultiPickerOption<T>[];
  config?: NativeMultiPickerComponentConfig;
  // width?: number; // @TODO
};

export type NativeMultiPickerProps<T extends string> = {
  components: NativeMultiPickerComponent<T>[];
  selections?: T[];
  label?: string;
  disabled?: boolean;
  style?: StyleProp<NativeTextStyle>;
  onChange?: (value: T[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const MultiPicker = <T extends string>({
  components,
  selections,
  label,
  onChange: onChangeProp,
  onFocus,
  onBlur,
  style,
  ...otherProps
}: NativeMultiPickerProps<T>): ReactNode => {
  const onChange = useMemo(
    () =>
      onChangeProp
        ? (value: string) => {
            const parsedValue = JSON.parse(value) as T[];
            onChangeProp(parsedValue);
          }
        : undefined,
    [onChangeProp],
  );

  // Ensure selections array matches components length by truncating first, then padding
  const normalizedSelections = selections
    ? fillArray(selections.slice(0, components.length), components.length, "" as T)
    : undefined;
  const normalizedComponents = useMemo(
    () =>
      components.map((component) => {
        const { options, config, ...rest } = component;
        const normalizedConfig = config ? { ...DEFAULT_COMPONENT_CONFIG, ...config } : undefined;
        const normalizedOptions = options
          ? options.length > 0 && typeof options[0] === "string"
            ? options.map((value) => ({ value, label: value }))
            : options
          : [];
        return { ...rest, config: normalizedConfig, options: normalizedOptions };
      }),
    [components],
  );
  const normalizedStyles = useNormalizedStyles<NativeTextStyle>(style);

  useSwiftUINode(
    "MultiPicker",
    {
      components: normalizedComponents,
      selections: normalizedSelections,
      style: normalizedStyles,
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
MultiPicker.displayName = "MultiPicker";
