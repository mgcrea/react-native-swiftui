import { type ReactNode, useMemo } from "react";

import { useNormalizedStyles, useSwiftUINode, useParsedEvent, castToOptionValue } from "../../hooks";
import type {
  ControlSize,
  NativeLabelStyleProps,
  NativeTextStyle,
  NativeTextStyleProps,
  PickerConfig,
  PickerOption,
  PickerStyle,
  WithId,
} from "../../types";

// https://developer.apple.com/documentation/swiftui/picker

const DEFAULT_PICKER_CONFIG = {
  min: 0,
  max: 100,
  step: 1,
  prefix: "",
  suffix: "",
} satisfies PickerConfig;

export type NativePickerProps<T extends string> = WithId<
  NativeTextStyleProps &
    NativeLabelStyleProps & {
      options?: readonly PickerOption<T>[];
      config?: PickerConfig;
      value?: T;
      selection?: T;
      label?: string;
      pickerStyle?: PickerStyle;
      controlSize?: ControlSize;
      disabled?: boolean;
      onChange?: (value: T) => void;
      onFocus?: () => void;
      onBlur?: () => void;
    }
>;

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
  // The only "parse" is the T cast; native sends the option's own value back.
  const onChange = useParsedEvent(castToOptionValue<T>, onChangeProp);

  // Prefer value over selection
  const resolvedSelection = value ?? selection;
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
