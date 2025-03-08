import { PropsWithChildren, ReactElement, ReactNode, useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  Button,
  DatePicker,
  Form,
  Group,
  Picker,
  Section,
  Slider,
  Stepper,
  Text,
  TextField,
  Toggle,
} from "./components";
import { SwiftUIParentIdProvider } from "./contexts";
import { SwiftUIProvider, useSwiftUIContext } from "./contexts/SwiftUIContext";
import {
  NativeSwiftUIEvent,
  default as SwiftUIRootNativeComponent,
} from "./native/SwiftUIRootNativeComponent";
import { buildViewTree } from "./utils/viewTree";

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

  const nodes = getNodes();
  console.log(`SwiftUIRoot rendering with ${nodes.size} nodes`);
  useEffect(() => {
    const viewTree = buildViewTree(nodes);
    console.log("SwiftUIRoot updating view tree", viewTree);
    nativeRef.current?.setNativeProps({ viewTree: JSON.stringify(viewTree) });
    // }, [JSON.stringify(nodes)]);
  }, [nodes.size, JSON.stringify(nodes.keys())]);

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
    <SwiftUIRootNativeComponent ref={nativeRef} onEvent={handleEvent} style={style}>
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
SwiftUI.Group = Group;
