# React Native SwiftUI

A proof-of-concept (PoC) library that integrates SwiftUI components into React Native using the Fabric renderer. This project enables developers to define native iOS UI elements with SwiftUI, controlled via React Native’s JSX syntax, creating a hybrid UI where React drives a dynamic SwiftUI view hierarchy.

## Motivation

React Native excels at cross-platform development, but its UI components can lack the polish and performance of native iOS frameworks like SwiftUI. This PoC bridges that gap by:

- Leveraging SwiftUI’s declarative, high-performance UI toolkit for iOS.
- Using React Native’s Fabric renderer for modern, efficient native integration.
- Enabling a familiar JSX workflow to manage native views.

Ideal for developers seeking native iOS aesthetics and behavior within a React Native app, this project explores a hybrid paradigm for enhanced UI flexibility.

## How It Works

1. **JSX to View Tree**: React components (e.g., `<SwiftUI.TextField>`) are converted into a JSON `viewTree` using TypeScript utilities.
2. **Native Rendering**: The `viewTree` is sent to iOS, where SwiftUI renders it via Fabric’s native bridge.
3. **Two-Way Binding**: State updates (e.g., text input) sync between React and SwiftUI via event handlers.
4. **Event Handling**: Native events (e.g., `onChange`, `focus`) are bubbled back to JavaScript.

### Architecture

- **React Native (JS/TS)**: Defines UI structure and logic in JSX, generates `viewTree`.
- **Fabric**: Facilitates communication between JS and native code.
- **SwiftUI (iOS)**: Renders the UI using native components like `Picker`, `TextField`, etc.
- **Bridge**: Custom Objective-C++ and Swift files (e.g., `RCTSwiftUIRootView.mm`) manage data flow.

## Features

- **Supported Components**: `Form`, `Section`, `TextField`, `Picker`, `DatePicker`, `Stepper` (more in development).
- **Two-Way Data Binding**: Syncs state between JS and SwiftUI (e.g., text input updates).
- **Event Support**: Handles `change`, `focus`, `blur`, etc., across the JS-native boundary.
- **Type Safety**: TypeScript definitions for props and events.

## Installation

### Prerequisites

- Node.js ≥ 18
- React Native 0.78.0+
- iOS 15.1+ (SwiftUI requirement)
- `pnpm` (package manager)

### Steps

```bash
git clone https://github.com/mgcrea/react-native-swiftui.git
cd react-native-swiftui
corepack enable # Enable pnpm if not already
pnpm install
cd example
pnpm install:ios # Install iOS dependencies
pnpm open:ios # Open Xcode to run the example
```
