import { ReactNode, useMemo } from "react";
import { StyleProp } from "react-native";
import { useNormalizedStyles, useSwiftUINode } from "../hooks";
import type { NativeTextStyle } from "../types";
import { fillArray } from "../utils";

// https://developer.apple.com/documentation/swiftui/picker

export type NativeMultiPickerOption<T extends string> = { value: T; label: string } | T;

export type NativeMultiPickerComponent<T extends string> = {
  label?: string;
  options: readonly NativeMultiPickerOption<T>[];
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

  // .map((selection) => String(selection) as T)
  const normalizedSelections = selections ? fillArray(selections, components.length, "" as T) : undefined;
  const normalizedComponents = useMemo(
    () =>
      components.map((component) => {
        const { options, ...rest } = component;
        const normalizedOptions =
          options.length > 0 && typeof options[0] === "string"
            ? options.map((value) => ({ value, label: value }))
            : options;
        return { ...rest, options: normalizedOptions };
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
