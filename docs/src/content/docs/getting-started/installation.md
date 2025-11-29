---
title: Installation
description: How to install and set up React Native SwiftUI in your project
---

## Requirements

Before installing, ensure your project meets these requirements:

- **React Native** 0.76 or later (New Architecture with Fabric renderer)
- **iOS** 15.1 or later
- **Node.js** 18 or later

:::note
This library requires the New Architecture (Fabric renderer) to be enabled in your React Native project. It will not work with the legacy architecture.
:::

## Installation

Install the package using your preferred package manager:

```bash
# npm
npm install @mgcrea/react-native-swiftui

# pnpm
pnpm add @mgcrea/react-native-swiftui

# yarn
yarn add @mgcrea/react-native-swiftui
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

## Enabling New Architecture

If you haven't already enabled the New Architecture in your React Native project, you'll need to do so.

### For React Native 0.76+

The New Architecture is enabled by default in React Native 0.76+. No additional configuration is needed.

### For React Native 0.73-0.75

Add the following to your `ios/Podfile`:

```ruby
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

Then reinstall pods:

```bash
cd ios && pod install && cd ..
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
