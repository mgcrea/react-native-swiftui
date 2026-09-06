import type { PropsWithChildren } from "react";

import { parseNumber } from "../../hooks";
import type { NativeLabelStyleProps, NativeTextStyleProps } from "../../types";
import { createNodeComponent } from "./createNodeComponent";

// https://developer.apple.com/documentation/swiftui/stepper

export type NativeStepperProps = NativeTextStyleProps &
  NativeLabelStyleProps & {
    value?: number;
    label?: string;
    minimum?: number;
    maximum?: number;
    step?: number;
    onChange?: (value: number) => void;
    onFocus?: () => void;
    onBlur?: () => void;
  };

export const Stepper = createNodeComponent<PropsWithChildren<NativeStepperProps>, number>("Stepper", {
  parse: parseNumber,
  container: true,
});
