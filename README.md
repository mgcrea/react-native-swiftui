<!-- markdownlint-disable MD033 -->
<p align="center">
  <a href="https://mgcrea.github.io/react-native-swiftui">
    <img src="./.github/assets/logo.png" alt="logo" width="480" height="300"/>
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@mgcrea/react-native-swiftui">
    <img src="https://img.shields.io/npm/v/@mgcrea/react-native-swiftui.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/react-native-swiftui">
    <img src="https://img.shields.io/npm/dt/@mgcrea/react-native-swiftui.svg?style=for-the-badge" alt="npm total downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/react-native-swiftui">
    <img src="https://img.shields.io/npm/dm/@mgcrea/react-native-swiftui.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/react-native-swiftui">
    <img src="https://img.shields.io/npm/l/@mgcrea/react-native-swiftui.svg?style=for-the-badge" alt="npm license" />
  </a>
  <br />
  <a href="https://github.com/mgcrea/react-native-swiftui/actions/workflows/main.yaml">
    <img src="https://img.shields.io/github/actions/workflow/status/mgcrea/react-native-swiftui/main.yaml?style=for-the-badge&branch=master" alt="build status" />
  </a>
  <a href="https://depfu.com/github/mgcrea/react-native-swiftui">
    <img src="https://img.shields.io/depfu/dependencies/github/mgcrea/react-native-swiftui?style=for-the-badge" alt="dependencies status" />
  </a>
</p>
<!-- markdownlint-enable MD037 -->

A proof-of-concept (PoC) library that integrates SwiftUI components into React Native using the Fabric renderer. This project enables developers to define native iOS UI elements with SwiftUI, controlled via React Native’s JSX syntax, creating a hybrid UI where React drives a dynamic SwiftUI view hierarchy.

## Motivation

React Native excels at cross-platform development, but its UI components can sometimes lack the polish and performance of native iOS frameworks like SwiftUI. This PoC bridges that gap by:

- Leveraging SwiftUI’s declarative, high-performance UI toolkit for iOS.
- Using React Native’s Fabric renderer for modern, efficient native integration.
- Enabling a familiar JSX workflow to manage native views.

Ideal for developers seeking native iOS aesthetics and behavior within a React Native app, this project explores a hybrid paradigm for enhanced UI flexibility.

## Features

- **Supported Components**: `Form`, `Section`, `TextField`, `Picker`, `DatePicker`, `Stepper`, `Button` (more in development).
- **Two-Way Data Binding**: Syncs state between JavaScript and SwiftUI (e.g., text input updates via `onChange`).
- **Event Support**: Handles events like `change`, `focus`, `blur`, `press` across the JS-native boundary.
- **Visual Feedback**: Disabled fields (e.g., `TextField` with `disabled={true}`) are grayed out and faded for clarity.
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
              <SwiftUI.TextField label="Duration:" text={value} onChange={onChange} disabled={false} />
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

## How It Works

1. **Component-Level Tree Building**: Each `SwiftUI.*` component (e.g., `<SwiftUI.TextField>`) registers itself with a `viewTree` during React’s render phase, using a context-based system.
2. **Native Rendering**: The aggregated `viewTree` is serialized as JSON and sent to iOS, where SwiftUI renders it via Fabric’s native bridge. Components use a unified `Decodable` approach for prop initialization.
3. **Two-Way Binding**: State updates (e.g., text input) sync between React and SwiftUI via event handlers, with props merged efficiently on updates.
4. **Event Handling**: Native events (e.g., `onChange`, `onPress`) are bubbled back to JavaScript through a custom event system.

### Architecture

- **React Native (JS/TS)**:
  - Defines UI structure in JSX.
  - Uses `SwiftUIContext` for event handling and node registration.
  - Uses `SwiftUIParentContext` to maintain parent-child hierarchy.
  - Components register their `ViewTreeNode` dynamically during render.
- **Fabric**: Facilitates communication between JavaScript and native code.
- **SwiftUI (iOS)**:
  - Renders the UI using native components (e.g., `TextField`, `Button`) based on the `viewTree`.
  - `Props` classes (e.g., `PickerProps`) conform to `Decodable` for initialization and use `merge(from:)` for updates, unifying prop handling.
- **Bridge**: Custom Objective-C++ and Swift files (e.g., `RCTSwiftUIRootView.mm`, `SwiftUIRootView.swift`) manage data flow and event propagation.

### Key Implementation Details

- **Dynamic `viewTree` Generation**: Components register themselves via `SwiftUIContext.registerNode`, with hierarchy tracked using `SwiftUIParentContext`. This supports passthrough components (e.g., `<Controller />` from `react-hook-form`) without explicit prop forwarding.
- **Context System**:
  - `SwiftUIContext`: Manages event handlers and the `nodeRegistry`.
  - `SwiftUIParentContext`: Provides `parentId` to child components via `ParentIdProvider`, ensuring correct tree structure.
- **Prop Initialization**: Native `Props` classes use `Decodable` to initialize from JSON, reducing redundancy and ensuring consistency across `viewTree` and Fabric flows.
- **Rendering**: Components return `null` in JSX, as the UI is fully handled by SwiftUI on the native side.

### Notes

- **State Management**: The library is agnostic to state management. Use React state, `react-hook-form`, `formik`, or any other library to manage form values.
- **Events**: Pass callbacks like `onChange` or `onPress` to handle native events in JavaScript.
- **Disabled Fields**: Set `disabled={true}` on components like `TextField` to disable interaction, with visual feedback (grayed-out text and reduced opacity).

## Contributing

Feel free to fork the repo, experiment with new components, or suggest optimizations! Open issues or PRs on [GitHub](https://github.com/mgcrea/react-native-swiftui).
