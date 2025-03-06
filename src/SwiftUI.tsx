import {
  Children,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
  type FunctionComponent,
} from "react";
import { StyleProp, ViewStyle } from "react-native";
import { NativeContainerView, NativeSwiftUIEvent } from ".";
import {
  DatePicker,
  Form,
  Picker,
  Section,
  Stepper,
  TextField,
} from "./components";
import { SwiftUIProvider, useSwiftUIContext } from "./contexts/SwiftUIContext";
import { convertJsxToViewTree } from "./utils/viewTree";

export type SwiftUIProps = {
  onEvent?: (event: { nativeEvent: NativeSwiftUIEvent }) => void;
  style?: StyleProp<ViewStyle>;
};

export const SwiftUIRootView = ({
  children,
  style,
  onEvent: rootOnEvent,
}: PropsWithChildren<SwiftUIProps>): ReactNode => {
  const { getEventHandler } = useSwiftUIContext();

  const viewTree = useMemo(() => {
    console.log(`Children have changed!! ${Children.count(children)}`);
    return {
      type: "Group",
      id: "root",
      children: convertJsxToViewTree(children),
    };
  }, [children]);

  console.log(viewTree);

  const handleEvent: SwiftUIProps["onEvent"] = (event) => {
    const { id, name, value } = event.nativeEvent;
    console.log(`Received event "${name}" for id=${id}, value=${value}`);
    const handler = getEventHandler(id, name);
    if (handler) {
      handler(name === "change" ? value : undefined); // Pass value only for change
    }
    rootOnEvent?.(event); // Forward to root handler
  };

  return (
    <NativeContainerView
      viewTree={JSON.stringify(viewTree)}
      onEvent={handleEvent}
      style={style}
    >
      {children}
    </NativeContainerView>
  );
};

export const SwiftUI = ({
  children,
  ...props
}: PropsWithChildren<SwiftUIProps>): ReactElement => {
  return (
    <SwiftUIProvider>
      <SwiftUIRootView {...props}>{children}</SwiftUIRootView>
    </SwiftUIProvider>
  );
};

// Define sub-components
SwiftUI.Form = Form;
SwiftUI.Section = Section;
SwiftUI.TextField = TextField;
SwiftUI.Picker = Picker;
SwiftUI.DatePicker = DatePicker;
SwiftUI.Stepper = Stepper;

type Identifiable<T> = T & { id?: string };
type IdentifiableFunctionComponent<T> = FunctionComponent<Identifiable<T>>;
