import { type BubblingEventHandler } from "react-native/Libraries/Types/CodegenTypes";

export type NativeStepperProps = {
  value: number;
  label?: string;
  minimum?: number;
  maximum?: number;
  step?: number;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};
