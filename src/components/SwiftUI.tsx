import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useState,
} from "react";
import { callback, getHostComponent, type ViewConfig } from "react-native-nitro-modules";
import SwiftUIRootViewConfig from "../../nitrogen/generated/shared/json/SwiftUIRootViewConfig.json";
import type { SwiftUIRootViewMethods, SwiftUIRootViewProps } from "../specs/SwiftUIRootView.nitro";
import type { ViewStyleProps } from "../types";
import { SwiftUIParentIdProvider } from "./../contexts";
import { SwiftUIProvider, useSwiftUIContext } from "./../contexts/SwiftUIContext";
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
  SheetPicker,
  Slider,
  Spacer,
  Stepper,
  Text,
  TextField,
  Toggle,
  VStack,
  ZStack,
} from "./SwiftUI/index";

const NativeSwiftUIRootView = getHostComponent<SwiftUIRootViewProps, SwiftUIRootViewMethods>(
  "SwiftUIRootView",
  () => SwiftUIRootViewConfig as ViewConfig<SwiftUIRootViewProps>,
);

export type SwiftUIEvent = {
  name: string;
  value: string;
  type: string;
  id: string;
};

export type SwiftUIProps = ViewStyleProps & {
  id?: string;
  onEvent?: (event: SwiftUIEvent) => void;
  debug?: boolean;
};

export const SwiftUIRoot = ({
  id: rootId,
  children,
  style,
  onEvent: rootOnEvent,
  debug = false,
}: PropsWithChildren<SwiftUIProps>): ReactNode => {
  const {
    nativeRef,
    hybridRef,
    getEventHandler,
    nodesKey,
    renderSequenceKey,
    getNodes,
    renderSequence,
    commitRenderSequence,
  } = useSwiftUIContext();

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

  // Reset sequence before children render so it's rebuilt fresh each time
  renderSequence.current = [];

  // After render, commit the sequence - use layout effect to run synchronously
  useLayoutEffect(() => {
    commitRenderSequence();
  });

  const [viewTreeJson, setViewTreeJson] = useState<string | undefined>(undefined);

  // Rebuild view tree when nodes or order changes
  useEffect(() => {
    const viewTree = buildViewTree(nodes, renderSequence.current);
    log(`updating view tree`, viewTree);
    setViewTreeJson(JSON.stringify(viewTree));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesKey, renderSequenceKey]);

  const handleEvent = useCallback(
    (name: string, value: string, type: string, id: string) => {
      log(`received event "${name}" for id=${id}, value=${value}`);
      const handler = getEventHandler(id, name);
      if (handler) {
        handler(name === "change" ? value : ""); // Pass value only for change
      }
      rootOnEvent?.({ name, value, type, id }); // Forward to root handler
    },
    [getEventHandler, log, rootOnEvent],
  );

  return (
    <NativeSwiftUIRootView
      ref={nativeRef}
      hybridRef={callback((ref) => {
        hybridRef.current = ref;
      })}
      onEvent={callback(handleEvent)}
      style={style}
      viewTree={viewTreeJson}
    >
      {children}
    </NativeSwiftUIRootView>
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
SwiftUI.SheetPicker = SheetPicker;
SwiftUI.Slider = Slider;
SwiftUI.Spacer = Spacer;
SwiftUI.Stepper = Stepper;
SwiftUI.Text = Text;
SwiftUI.TextField = TextField;
SwiftUI.NumberField = NumberField;
SwiftUI.Toggle = Toggle;
SwiftUI.VStack = VStack;
SwiftUI.ZStack = ZStack;
