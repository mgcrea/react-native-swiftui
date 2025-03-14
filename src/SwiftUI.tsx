import { PropsWithChildren, ReactElement, ReactNode, useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  Button,
  DatePicker,
  Form,
  Group,
  HStack,
  Image,
  LazyVGrid,
  Picker,
  Rectangle,
  Section,
  Sheet,
  Slider,
  Spacer,
  Stepper,
  Text,
  TextField,
  Toggle,
  VStack,
  ZStack,
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
  const { nativeRef, getEventHandler, getNodes, renderSequence } = useSwiftUIContext();

  const nodes = getNodes();
  const nodesKey = JSON.stringify(Array.from(nodes.keys()));
  console.log(`SwiftUIRoot rendering with ${nodes.size} nodes`);
  renderSequence.current = []; // Reset render sequence
  useEffect(() => {
    const viewTree = buildViewTree(nodes, renderSequence.current);
    console.log("SwiftUIRoot updating view tree", viewTree);
    nativeRef.current?.setNativeProps({ viewTree: JSON.stringify(viewTree) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeRef, nodesKey]);

  const handleEvent: SwiftUIProps["onEvent"] = (event) => {
    const { id, name, value } = event.nativeEvent;
    console.log(`SwiftUIRoot received event "${name}" for id=${id}, value=${value}`);
    const handler = getEventHandler(id, name);
    if (handler) {
      handler(name === "change" ? value : ""); // Pass value only for change
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
SwiftUI.Button = Button;
SwiftUI.DatePicker = DatePicker;
SwiftUI.Form = Form;
SwiftUI.Group = Group;
SwiftUI.HStack = HStack;
SwiftUI.Image = Image;
SwiftUI.LazyVGrid = LazyVGrid;
SwiftUI.Picker = Picker;
SwiftUI.Rectangle = Rectangle;
SwiftUI.Section = Section;
SwiftUI.Sheet = Sheet;
SwiftUI.Slider = Slider;
SwiftUI.Spacer = Spacer;
SwiftUI.Stepper = Stepper;
SwiftUI.Text = Text;
SwiftUI.TextField = TextField;
SwiftUI.Toggle = Toggle;
SwiftUI.VStack = VStack;
SwiftUI.ZStack = ZStack;
