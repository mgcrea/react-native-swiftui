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
import { DatePicker, Form, Picker, Section, Stepper, TextField, Button } from "./components";
import { SwiftUIProvider, useSwiftUIContext } from "./contexts/SwiftUIContext";
import { buildViewTree, convertJsxToViewTree } from "./utils/viewTree";
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

  // const viewTree = useMemo(() => {
  //   console.log(`Children have changed!! ${Children.count(children)}`);
  //   return {
  //     type: "Group",
  //     id: "root",
  //     children: convertJsxToViewTree(children),
  //   };
  // }, [children]);

  // const [debouncedViewTree, setDebouncedViewTree] = useState(
  //   JSON.stringify(viewTree)
  // );
  // useEffect(() => {
  //   const timeout = setTimeout(
  //     () => setDebouncedViewTree(JSON.stringify(viewTree)),
  //     100
  //   );
  //   return () => clearTimeout(timeout);
  // }, [viewTree]);
  // console.log({ debouncedViewTree });

  const [viewTree, setViewTree] = useState<ViewTreeNode | null>(null);

  useEffect(() => {
    const nodes = getNodes();
    setViewTree(buildViewTree(nodes));
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
