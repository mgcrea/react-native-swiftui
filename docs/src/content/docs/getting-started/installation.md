---
title: Installation
description: How to install and set up React Native SwiftUI in your project
---

## Requirements

Before installing, ensure your project meets these requirements:

- **React Native** 0.78 or later (New Architecture enabled)
- **iOS** 15.1 or later
- **Node.js** 18 or later

:::note
This library depends on [Nitro Modules](https://nitro.margelo.com/), which requires the New Architecture. It will not work with the legacy architecture.
:::

## Installation

Install the package and its Nitro Modules peer dependency using your preferred package manager:

```bash
# npm
npm install @mgcrea/react-native-swiftui react-native-nitro-modules

# pnpm
pnpm add @mgcrea/react-native-swiftui react-native-nitro-modules

# yarn
yarn add @mgcrea/react-native-swiftui react-native-nitro-modules
```

## iOS Setup

After installing the package, install the iOS dependencies:

```bash
cd ios && pod install && cd ..
```

Or using the library's helper script:

```bash
npm run install:ios
```

## Verify Installation

Create a simple test component to verify the installation:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { View } from 'react-native';

export function TestSwiftUI() {
  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Text text="Hello from SwiftUI!" />
      </SwiftUI>
    </View>
  );
}
```

If you see "Hello from SwiftUI!" rendered with native iOS styling, the installation was successful.

## Next Steps

- Learn the basics in the [Quick Start](/getting-started/quick-start/) guide
- Explore available [Components](/components/overview/)
- Check out the [Examples](/examples/basic-form/) for real-world usage
