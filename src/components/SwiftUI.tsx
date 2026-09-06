import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
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
    getEventHandler,
    nodesKey,
    renderSequenceKey,
    getNodes,
    renderSequence,
    resetRenderSequence,
    commitRenderSequence,
    attachHybrid,
  } = useSwiftUIContext();

  const log = useCallback(
    (message: string, ...args: unknown[]) => {
      if (debug) {
        console.log(`SwiftUIRoot(${rootId}) ${message}`, ...args);
      }
    },
    [rootId, debug],
  );

  if (debug) log(`rendering with ${getNodes().size} nodes`);

  // Reset sequence before children render so it's rebuilt fresh each time
  resetRenderSequence();

  // After render, commit the sequence - use layout effect to run synchronously
  useLayoutEffect(() => {
    commitRenderSequence();
  });

  const [viewTreeJson, setViewTreeJson] = useState<string | undefined>(undefined);

  // Rebuild view tree when nodes or order changes. The registry is read through
  // `getNodes()` inside the effect rather than closing over the value computed
  // during render, so the dependency list can be honest: the version keys remain
  // the actual change signal, and everything else here is referentially stable.
  // The tree can only be built once the children have rendered and recorded
  // their order, which is why this is an effect keyed on the version signals and
  // not a value derived during render.
  useEffect(() => {
    const viewTree = buildViewTree(getNodes(), renderSequence.current);
    if (debug) log(`updating view tree`, viewTree);
    // Plain `JSON.stringify`, unlike `serializeProps` for updates: on a first
    // decode an absent key and a `null` one both leave the default in place, so
    // the sentinel would only pad the payload here.
    // oxlint-disable-next-line react/set-state-in-effect
    setViewTreeJson(JSON.stringify(viewTree));
  }, [nodesKey, renderSequenceKey, getNodes, renderSequence, debug, log]);

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

  // Nitro's `callback()` returns a fresh `{ f }` wrapper on every call, so an
  // inline `callback(...)` re-set both native props on every root render and
  // re-ran the hybridRef closure each time. Memoized on the underlying handler.
  const onHybridRef = useMemo(() => callback(attachHybrid), [attachHybrid]);
  const onNativeEvent = useMemo(() => callback(handleEvent), [handleEvent]);

  return (
    <NativeSwiftUIRootView
      hybridRef={onHybridRef}
      onEvent={onNativeEvent}
      style={style}
      viewTree={viewTreeJson}
    >
      {children}
    </NativeSwiftUIRootView>
  );
};

export const SwiftUI = ({ children, debug, ...props }: PropsWithChildren<SwiftUIProps>): ReactElement => {
  const generatedId = useId();
  const id = props.id || `root:${generatedId}`;
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
