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
    <img src="https://img.shields.io/github/actions/workflow/status/mgcrea/react-native-swiftui/main.yaml?style=for-the-badge&branch=main" alt="build status" />
  </a>
  <a href="https://depfu.com/github/mgcrea/react-native-swiftui">
    <img src="https://img.shields.io/badge/dependencies-none-brightgreen?style=for-the-badge" alt="dependencies status" />
  </a>
</p>
<!-- markdownlint-enable MD033 -->

## Overview

Native SwiftUI components for React Native using the Fabric renderer. Build iOS forms and interfaces with SwiftUI's declarative syntax while maintaining a familiar React workflow.

## Features

- **🍎 Native SwiftUI** - Real SwiftUI components, not web views or custom drawings
- **🔧 No Dependencies** - Safe from supply chain attacks
- **⚡ Fabric Renderer** - Built on React Native's modern architecture
- **📝 TypeScript-first** - Full type safety and autocomplete support
- **🔄 Two-Way Binding** - State syncs between JavaScript and SwiftUI
- **📋 Form Components** - TextField, Picker, DatePicker, Toggle, Stepper, Slider
- **📐 Layout Components** - Form, Section, HStack, VStack, ZStack, Spacer
- **🎨 SF Symbols** - Full SF Symbol support with rendering modes and variable values
- **📱 Sheet Presentation** - Native modal sheets with detent support
- **🔌 Form Libraries** - Works with react-hook-form, TanStack Form, and more

## Demo

![demo](./.github/assets/demo.gif)

Try it yourself with the [Rxd AppStore application](https://apps.apple.com/fr/app/rxd/id6745904823?l=en-GB)

## Quick Start

### Installation

```bash
npm install @mgcrea/react-native-swiftui
# or
pnpm add @mgcrea/react-native-swiftui
# or
yarn add @mgcrea/react-native-swiftui
```

### Requirements

- React Native 0.78.0+ (New Architecture required)
- iOS 15.1+

### Basic Usage

```tsx
import { SwiftUI } from "@mgcrea/react-native-swiftui";
import { useState } from "react";
import { View } from "react-native";

export function ProfileForm() {
  const [name, setName] = useState("");
  const [active, setActive] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Profile">
            <SwiftUI.TextField label="Name" text={name} onChange={setName} />
            <SwiftUI.Toggle label="Active" isOn={active} onChange={setActive} />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## How It Works

SwiftUI components register themselves in a virtual tree that's rendered natively:

1. **React renders JSX** - Components return `null`, registering nodes in a tree
2. **Tree serialization** - The view tree is passed to native code as JSON
3. **SwiftUI renders** - Native SwiftUI renders the entire tree
4. **Events bridge back** - User interactions trigger React callbacks

This means 60fps native performance with no JavaScript layout overhead.

## Documentation

📚 **[Full Documentation](https://mgcrea.github.io/react-native-swiftui/)**

- **[Getting Started](https://mgcrea.github.io/react-native-swiftui/getting-started/installation/)** - Installation and setup
- **[Components](https://mgcrea.github.io/react-native-swiftui/components/overview/)** - SwiftUI tree components
- **[Standalone](https://mgcrea.github.io/react-native-swiftui/standalone/sfsymbol/)** - Native components like SFSymbol
- **[Guides](https://mgcrea.github.io/react-native-swiftui/guides/styling/)** - Styling, events, and form integration
- **[Examples](https://mgcrea.github.io/react-native-swiftui/examples/basic-form/)** - Complete working examples

## Contributing

Contributions are welcome! To run the example project:

```bash
git clone https://github.com/mgcrea/react-native-swiftui.git
cd react-native-swiftui
pnpm install
pnpm run codegen:ios

cd example
pnpm install
pnpm run install:ios
pnpm run ios
```

## Credits

- [SwiftUI](https://developer.apple.com/xcode/swiftui/) - Apple's declarative UI framework
- [React Native](https://reactnative.dev/) - Build native apps using React

## Authors

- [Olivier Louvignes](https://github.com/mgcrea) - [@mgcrea](https://twitter.com/mgcrea)

```text
MIT License

Copyright (c) 2025 Olivier Louvignes <olivier@mgcrea.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
