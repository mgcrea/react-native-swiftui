import { View, Text, StyleProp, Alert, ViewStyle } from "react-native";
import {
  Children,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  type FunctionComponent,
} from "react";
import { NativeContainerView } from ".";
import { convertJsxToViewTree } from "./utils/viewTree";
import { NativeTextFieldProps } from "./TextFieldViewNativeComponent";

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
  const onChange = ({ nativeEvent }: { nativeEvent: { value: string } }) => {
    const title = "Result";
    const message = JSON.stringify(nativeEvent);
    Alert.alert(title, message);
  };
  return (
    <NativeContainerView
      viewTree={JSON.stringify(viewTree)}
      onChange={onChange}
      style={style}
    />
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
SwiftUI.Section = function SwiftUISection({
  header,
  children,
  ...props
}: {
  header?: string;
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

const TextField: FunctionComponent<NativeTextFieldProps> = () => null;
TextField.displayName = "TextField";
SwiftUI.TextField = TextField;
