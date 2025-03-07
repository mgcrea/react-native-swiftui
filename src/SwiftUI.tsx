import {
  Children,
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  use,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from "react";
import { StyleProp, ViewStyle } from "react-native";
import { NativeContainerView, NativeSwiftUIEvent } from ".";
import { DatePicker, Form, Picker, Section, Stepper, TextField, Button, Text, Toggle } from "./components";
import { SwiftUIProvider, useSwiftUIContext } from "./contexts/SwiftUIContext";
import { buildViewTree } from "./utils/viewTree";
import { SwiftUIParentIdProvider } from "./contexts";
import type { ViewTreeNode } from "./types";

export type SwiftUIProps = {
  onEvent?: (event: { nativeEvent: NativeSwiftUIEvent }) => void;
  style?: StyleProp<ViewStyle>;
};

export const SwiftUIRootView = ({
  children,
  style,
  onEvent: rootOnEvent,
}: PropsWithChildren<SwiftUIProps>): ReactNode => {
  const { getEventHandler, getNodes } = useSwiftUIContext();

  const [viewTree, setViewTree] = useState<ViewTreeNode | null>(null);

  useEffect(() => {
    const nodes = getNodes();
    const viewTree = buildViewTree(nodes);
    console.log({ viewTree });
    setViewTree(viewTree);
  }, [getNodes]);

  const serializedViewTree = useMemo(() => {
    return JSON.stringify(viewTree);
  }, [viewTree]);

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
    <NativeContainerView viewTree={serializedViewTree} onEvent={handleEvent} style={style}>
      {children}
    </NativeContainerView>
  );
};

export const SwiftUI = ({ children, ...props }: PropsWithChildren<SwiftUIProps>): ReactElement => {
  return (
    <SwiftUIProvider>
      <SwiftUIParentIdProvider id="__root">
        <SwiftUIRootView {...props}>{children}</SwiftUIRootView>
      </SwiftUIParentIdProvider>
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
SwiftUI.Button = Button;
SwiftUI.Text = Text;
SwiftUI.Toggle = Toggle;
