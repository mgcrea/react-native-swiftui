import { View, Text, StyleProp, Alert, ViewStyle } from "react-native";
import {
  Children,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useId,
  type FunctionComponent,
} from "react";
import { NativeContainerView } from ".";
import { convertJsxToViewTree } from "./utils/viewTree";
import type {
  NativeTextFieldProps,
  NativeStepperProps,
  NativeSectionProps,
} from "./props";

export type SwiftUIProps = {
  style?: StyleProp<ViewStyle>;
};

export const SwiftUI = ({
  children,
  style,
}: PropsWithChildren<SwiftUIProps>): ReactNode => {
  const viewTree = {
    type: "Group",
    id: "root",
    children: convertJsxToViewTree(children),
  };
  console.log({ viewTree });
  const id = useId();
  const id2 = useId();
  console.log({ id, id2 });
  const onEvent = ({ nativeEvent }: { nativeEvent: { value: string } }) => {
    const title = "Result";
    const message = JSON.stringify(nativeEvent);
    Alert.alert(title, message);
  };
  return (
    <NativeContainerView
      viewTree={JSON.stringify(viewTree)}
      onEvent={onEvent}
      style={style}
    >
      {children}
    </NativeContainerView>
  );
};

// Define sub-components as simple passthroughs (no rendering, just structure)
SwiftUI.Form = function SwiftUIForm({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
};
SwiftUI.Picker = function SwiftUIPicker({
  label,
  selection,
  options,
  pickerStyle,
  ...props
}: {
  label: string;
  selection: string;
  options: string[];
  pickerStyle?: string;
}) {
  return null;
};
SwiftUI.DatePicker = function SwiftUIDatePicker({
  label,
  selection,
  displayedComponents,
  ...props
}: {
  label: string;
  selection: Date;
  displayedComponents: "date" | "dateTime";
}) {
  return null;
};

const Section: FunctionComponent<PropsWithChildren<NativeSectionProps>> = ({
  children,
}) => {
  console.warn("Section");
  return <>{children}</>;
};
Section.displayName = "Section";
SwiftUI.Section = Section;

const TextField: FunctionComponent<NativeTextFieldProps> = () => {
  console.warn("TextField");
  return null;
};
TextField.displayName = "TextField";
SwiftUI.TextField = TextField;

const Stepper: FunctionComponent<Identifiable<NativeStepperProps>> = () => {
  console.warn("Stepper");
  return null;
};
Stepper.displayName = "Stepper";
SwiftUI.Stepper = Stepper;

type Identifiable<T> = T & { id?: string };
