import { PropsWithChildren, ReactElement, ReactNode, useCallback, useEffect, useId } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SwiftUIParentIdProvider } from "./../contexts";
import { SwiftUIProvider, useSwiftUIContext } from "./../contexts/SwiftUIContext";
import {
  NativeSwiftUIEvent,
  default as SwiftUIRootNativeComponent,
} from "./../native/SwiftUIRootNativeComponent";
import { buildViewTree } from "./../utils/viewTree";
import {
  Button,
  DatePicker,
  Form,
  Group,
  HStack,
  Image,
  LazyVGrid,
  MultiPicker,
  NumberField,
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
} from "./SwiftUI/index";

export type SwiftUIProps = {
  id?: string;
  onEvent?: (event: { nativeEvent: NativeSwiftUIEvent }) => void;
  style?: StyleProp<ViewStyle>;
  debug?: boolean;
};

export const SwiftUIRoot = ({
  id: rootId,
  children,
  style,
  onEvent: rootOnEvent,
  debug = false,
}: PropsWithChildren<SwiftUIProps>): ReactNode => {
  const { nativeRef, getEventHandler, nodesKey, getNodes, renderSequence } = useSwiftUIContext();

  const log = useCallback(
    (message: string, ...args: unknown[]) => {
      if (debug) {
        console.log(`SwiftUIRoot(${rootId}) ${message}`, ...args);
      }
    },
    [rootId, debug],
  );

  const nodes = getNodes();
  log(`rendering with ${nodes.size} nodes`);
  renderSequence.current = []; // Reset render sequence
  useEffect(() => {
    const viewTree = buildViewTree(nodes, renderSequence.current);
    log(`updating view tree`, viewTree);
    nativeRef.current?.setNativeProps({ viewTree: JSON.stringify(viewTree) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativeRef, nodesKey]);

  const handleEvent: SwiftUIProps["onEvent"] = (event) => {
    const { id, name, value } = event.nativeEvent;
    log(`received event "${name}" for id=${id}, value=${value}`);
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

export const SwiftUI = ({ children, debug, ...props }: PropsWithChildren<SwiftUIProps>): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/prefer-nullish-coalescing
  const id = props.id || `root:${useId()}`;
  return (
    <SwiftUIProvider id={id} debug={debug}>
      <SwiftUIParentIdProvider id="__root">
        <SwiftUIRoot id={id} debug={debug} {...props}>
          {children}
        </SwiftUIRoot>
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
SwiftUI.MultiPicker = MultiPicker;
SwiftUI.Rectangle = Rectangle;
SwiftUI.Section = Section;
SwiftUI.Sheet = Sheet;
SwiftUI.Slider = Slider;
SwiftUI.Spacer = Spacer;
SwiftUI.Stepper = Stepper;
SwiftUI.Text = Text;
SwiftUI.TextField = TextField;
SwiftUI.NumberField = NumberField;
SwiftUI.Toggle = Toggle;
SwiftUI.VStack = VStack;
SwiftUI.ZStack = ZStack;
