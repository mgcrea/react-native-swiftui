# React Native SwiftUI

A proof-of-concept (PoC) library that integrates SwiftUI components into React Native using the Fabric renderer. This project enables developers to define native iOS UI elements with SwiftUI, controlled via React Native’s JSX syntax, creating a hybrid UI where React drives a dynamic SwiftUI view hierarchy.

## Motivation

React Native excels at cross-platform development, but its UI components can sometimes lack the polish and performance of native iOS frameworks like SwiftUI. This PoC bridges that gap by:

- Leveraging SwiftUI’s declarative, high-performance UI toolkit for iOS.
- Using React Native’s Fabric renderer for modern, efficient native integration.
- Enabling a familiar JSX workflow to manage native views.

Ideal for developers seeking native iOS aesthetics and behavior within a React Native app, this project explores a hybrid paradigm for enhanced UI flexibility.

## How It Works

1. **Component-Level Tree Building**: Each `SwiftUI.*` component (e.g., `<SwiftUI.TextField>`) registers itself with a `viewTree` during React’s render phase, using a context-based system.
2. **Native Rendering**: The aggregated `viewTree` is serialized as JSON and sent to iOS, where SwiftUI renders it via Fabric’s native bridge.
3. **Two-Way Binding**: State updates (e.g., text input) sync between React and SwiftUI via event handlers.
4. **Event Handling**: Native events (e.g., `onChange`, `onPress`) are bubbled back to JavaScript through a custom event system.

### Architecture

- **React Native (JS/TS)**:
  - Defines UI structure in JSX.
  - Uses `SwiftUIContext` for event handling and node registration.
  - Uses `SwiftUIParentContext` to maintain parent-child hierarchy.
  - Components register their `ViewTreeNode` dynamically during render.
- **Fabric**: Facilitates communication between JavaScript and native code.
- **SwiftUI (iOS)**: Renders the UI using native components (e.g., `TextField`, `Button`) based on the `viewTree`.
- **Bridge**: Custom Objective-C++ and Swift files (e.g., `RCTSwiftUIRootView.mm`, `SwiftUIRootView.swift`) manage data flow and event propagation.

### Key Implementation Details

- **Dynamic `viewTree` Generation**: Unlike the initial static traversal, components now register themselves via `SwiftUIContext.registerNode`, with hierarchy tracked using `SwiftUIParentContext`. This supports passthrough components (e.g., `<Controller />` from `react-hook-form`) without explicit prop forwarding.
- **Context System**:
  - `SwiftUIContext`: Manages event handlers and the `nodeRegistry`.
  - `SwiftUIParentContext`: Provides `parentId` to child components via `ParentIdProvider`, ensuring correct tree structure.
- **Rendering**: Components return `null` in JSX, as the UI is fully handled by SwiftUI on the native side.

## Features

- **Supported Components**: `Form`, `Section`, `TextField`, `Picker`, `DatePicker`, `Stepper`, `Button` (more in development).
- **Two-Way Data Binding**: Syncs state between JavaScript and SwiftUI (e.g., text input updates via `onChange`).
- **Event Support**: Handles events like `change`, `focus`, `blur`, `press` across the JS-native boundary.
- **Type Safety**: TypeScript definitions for props and events, ensuring a robust developer experience.
- **Form Library Compatibility**: Works seamlessly with libraries like `react-hook-form` and `formik` via passthrough component support.

## Installation

### Prerequisites

- Node.js ≥ 18
- React Native 0.78.0+
- iOS 15.1+ (SwiftUI requirement)
- `pnpm` (package manager, version 10.5.2 recommended per `package.json`)

### Steps

Installation steps:

```sh
git clone https://github.com/mgcrea/react-native-swiftui.git
cd react-native-swiftui
corepack enable # Enable pnpm if not already installed
pnpm install # Install root dependencies
cd example
pnpm install:ios # Install iOS dependencies (includes pod install)
pnpm open:ios # Open Xcode to build and run the example app
```

## Usage Example

### Example with react-hook-form

```tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { SwiftUI } from "@mgcrea/react-native-swiftui";
function App() {
  const { control, handleSubmit } = useForm({ defaultValues: { duration: "60" } });
  const onSubmit = (data) => {
    console.log("Submitted:", data);
    Alert.alert("Submitted", `Duration: ${data.duration}`);
  };
  return (
    <SwiftUI>
      <SwiftUI.Form>
        <SwiftUI.Section header="Workout Settings">
          <Controller
            control={control}
            name="duration"
            render={({ field: { value, onChange } }) => (
              <SwiftUI.TextField label="Duration:" text={value} onChange={onChange} />
            )}
          />
          <SwiftUI.Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </SwiftUI.Section>
      </SwiftUI.Form>
    </SwiftUI>
  );
}
export default App;
```

### Notes

- **State Management**: The library is agnostic to state management. Use React state, `react-hook-form`, `formik`, or any other library to manage form values.
- **Events**: Pass callbacks like `onChange` or `onPress` to handle native events in JavaScript.

## Development Notes

### Current State

- The project has evolved from a static `viewTree` generation (`convertJsxToViewTree`) to a dynamic, component-level registration system using `SwiftUIContext` and `SwiftUIParentContext`.
- Components register their `ViewTreeNode` during render, with hierarchy maintained via `parentId` from `SwiftUIParentContext`.

### Resuming Work

- **Key Files**:
  - `src/contexts/SwiftUIContext.tsx`: Event and node registration logic.
  - `src/contexts/SwiftUIParentContext.tsx`: Hierarchy management with `ParentIdProvider`.
  - `src/SwiftUI.tsx`: Aggregates nodes into the `viewTree` and passes it to `NativeContainerView`.
  - `src/components/*.tsx`: Component implementations (e.g., `TextField`, `Form`).
- **Debugging Tips**:
  - Add `console.log(getNodes())` in `SwiftUIRootView`’s `useEffect` to inspect the `nodeRegistry`.
  - Verify the `viewTree` structure matches the JSX hierarchy by logging `JSON.stringify(viewTree)`.
- **Next Steps**:
  - **Performance**: Consider memoizing node registration to reduce re-renders (e.g., `useMemo` in components).
  - **Incremental Updates**: Explore sending diffs instead of the full `viewTree` on state changes (see `buildViewTree`).
  - **New Components**: Add more SwiftUI components (e.g., `Toggle`, `Slider`) by following the pattern in `TextField.tsx`.
  - **Testing**: Stress-test with large forms and frequent updates on real iOS devices.

### Known Limitations

- **Render Timing**: The `viewTree` is built in a `useEffect` to ensure all nodes are registered, which may cause a slight delay on initial render.
- **Children Array**: Currently, `children` in `ViewTreeNode` is empty at registration and populated by `buildViewTree`. This could be optimized if needed.

## Contributing

Feel free to fork the repo, experiment with new components, or suggest optimizations! Open issues or PRs on [GitHub](https://github.com/mgcrea/react-native-swiftui).
