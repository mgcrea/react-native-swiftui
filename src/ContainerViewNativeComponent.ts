import type { HostComponent, ViewProps } from "react-native";
import type {
  BubblingEventHandler,
  WithDefault,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

// enum NodeType {
//   Form = "Form",
//   Section = "Section",
//   TextField = "TextField",
//   Picker = "Picker",
//   DatePicker = "DatePicker",
// }

type NativeContainerChangeEvent = {
  value: string;
  type: string;
  id: string;
};

export interface NativeContainerProps extends ViewProps {
  viewTree: string;
  onChange?: BubblingEventHandler<Readonly<NativeContainerChangeEvent>>;
}

export default codegenNativeComponent<NativeContainerProps>(
  "NativeContainerView"
) as HostComponent<NativeContainerProps>;

// TypeScript

export type Node = {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: Node[];
};

export type ViewTree = Node;
