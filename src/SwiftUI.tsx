import {
  Children,
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FunctionComponent,
} from "react";
import { HostComponent, StyleProp, ViewStyle } from "react-native";
import {
  default as SwiftUIRootNativeComponent,
  Commands as NativeSwiftUIRootCommands,
  NativeSwiftUIEvent,
  NativeSwiftUIRootProps,
} from "./native/SwiftUIRootNativeComponent";
import {
  DatePicker,
  Form,
  Picker,
  Section,
  Stepper,
  TextField,
  Button,
  Text,
  Toggle,
  Slider,
} from "./components";
import { SwiftUIProvider, useSwiftUIContext } from "./contexts/SwiftUIContext";
import { buildViewTree } from "./utils/viewTree";
import { SwiftUIParentIdProvider } from "./contexts";
import type { ViewTreeNode } from "./types";

export type SwiftUIProps = {
  onEvent?: (event: { nativeEvent: NativeSwiftUIEvent }) => void;
  style?: StyleProp<ViewStyle>;
};

export const SwiftUIRoot = ({
  children,
  style,
  onEvent: rootOnEvent,
}: PropsWithChildren<SwiftUIProps>): ReactNode => {
  const { nativeRef, getEventHandler, getNodes } = useSwiftUIContext();

  const [viewTree, setViewTree] = useState<ViewTreeNode | null>(null);

  useEffect(() => {
    const nodes = getNodes();
    const viewTree = buildViewTree(nodes);
    setViewTree(viewTree);
  }, [getNodes]);

  const serializedViewTree = useMemo(() => {
    console.log("Serializing view tree", viewTree);
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
    <SwiftUIRootNativeComponent
      ref={nativeRef}
      viewTree={serializedViewTree}
      onEvent={handleEvent}
      style={style}
    >
      {children}
    </SwiftUIRootNativeComponent>
  );
};

export const SwiftUI = ({ children, ...props }: PropsWithChildren<SwiftUIProps>): ReactElement => {
  return (
    <SwiftUIProvider>
      <SwiftUIParentIdProvider id="__root">
        <SwiftUIRoot {...props}>{children}</SwiftUIRoot>
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
SwiftUI.Slider = Slider;
