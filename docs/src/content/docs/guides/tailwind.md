---
title: Tailwind CSS Integration
description: Using Tailwind CSS with React Native SwiftUI
---

This guide shows how to integrate React Native SwiftUI with [@mgcrea/react-native-tailwind](https://github.com/mgcrea/react-native-tailwind) using TypeScript declaration merging.

## Installation

Install the Tailwind package:

```bash
npm install @mgcrea/react-native-tailwind
```

Add the Babel plugin to your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['@mgcrea/react-native-tailwind/babel'],
};
```

## TypeScript Setup

### 1. Enable React Native className support

Create `src/types/react-native-tailwind.d.ts`:

```tsx
import "@mgcrea/react-native-tailwind/react-native";
```

### 2. Enable SwiftUI className support

Create `src/types/react-native-swiftui.d.ts`:

```tsx
/**
 * TypeScript declarations to add className props to React Native SwiftUI components
 * This provides module augmentation for @mgcrea/react-native-swiftui
 */

import "@mgcrea/react-native-swiftui";

declare module "@mgcrea/react-native-swiftui" {
  interface NativeViewStyleProps {
    className?: string;
  }
  interface NativeTextStyleProps {
    className?: string;
  }
  interface NativeLabelStyleProps {
    labelClassName?: string;
  }
}
```

Make sure your `tsconfig.json` includes these files:

```json
{
  "include": ["src/**/*"]
}
```

## Available Interfaces

The library exports these interfaces for declaration merging:

| Interface | Used By | Description |
|-----------|---------|-------------|
| `NativeViewStyleProps` | Container components | Base style props for VStack, HStack, Form, etc. |
| `NativeTextStyleProps` | Text components | Extended props for Text, Button, TextField, etc. |
| `NativeLabelStyleProps` | Labeled components | Label style props for Toggle, Picker, Slider, etc. |

## Basic Usage

After setup, you can use Tailwind classes directly on SwiftUI components:

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { SwiftUI } from '@mgcrea/react-native-swiftui';

export function MyComponent() {
  const [name, setName] = useState('');
  const [notifications, setNotifications] = useState(false);

  return (
    <View className="flex-1">
      <SwiftUI className="flex-1">
        <SwiftUI.Form className="bg-gray-100">
          <SwiftUI.Section header="Profile">
            <SwiftUI.TextField
              label="Name"
              className="text-lg"
              labelClassName="font-semibold text-blue-600"
              text={name}
              onChange={setName}
            />
            <SwiftUI.Toggle
              label="Notifications"
              labelClassName="text-gray-700"
              isOn={notifications}
              onChange={setNotifications}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Supported Features

The `@mgcrea/react-native-tailwind` package supports:

- **Zero runtime overhead** - All transformations happen at compile time via Babel
- **State modifiers** - `active:`, `hover:`, `focus:`, `disabled:` variants
- **Platform-specific** - `ios:`, `android:`, `web:` prefixes
- **Dark mode** - `dark:` and `light:` modifiers
- **Arbitrary values** - Custom sizing like `w-[123px]`

## Complete Example

```tsx
import { useState } from 'react';
import { View } from 'react-native';
import { SwiftUI } from '@mgcrea/react-native-swiftui';

export function SettingsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <SwiftUI className="flex-1">
        <SwiftUI.Form>
          <SwiftUI.Section header="Account">
            <SwiftUI.TextField
              label="Name"
              labelClassName="font-medium"
              text={name}
              onChange={setName}
            />
            <SwiftUI.TextField
              label="Email"
              labelClassName="font-medium"
              keyboardType="emailAddress"
              text={email}
              onChange={setEmail}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Appearance">
            <SwiftUI.Toggle
              label="Dark Mode"
              labelClassName="text-gray-800 dark:text-gray-200"
              isOn={darkMode}
              onChange={setDarkMode}
            />
            <SwiftUI.Slider
              label={`Font Size: ${fontSize}px`}
              labelClassName="text-sm text-gray-600"
              value={fontSize}
              minimum={12}
              maximum={24}
              step={1}
              onChange={setFontSize}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Extending Other Props

You can extend the interfaces for other use cases beyond Tailwind:

```tsx
declare module "@mgcrea/react-native-swiftui" {
  // Add testID for testing
  interface NativeViewStyleProps {
    testID?: string;
  }

  // Add accessibility props
  interface NativeTextStyleProps {
    accessibilityLabel?: string;
    accessibilityHint?: string;
  }

  // Add custom theming props
  interface NativeLabelStyleProps {
    labelVariant?: 'primary' | 'secondary' | 'muted';
  }
}
```

## Tips

1. **Keep declarations in sync** - Update your declaration file when the library adds new style interfaces
2. **Use a types directory** - Keep all custom declarations organized in a `src/types/` folder
3. **Type safety** - Declaration merging preserves full TypeScript support
4. **IDE support** - Your IDE will autocomplete the new props after declaration merging
5. **Platform modifiers** - Use `ios:` prefix for iOS-specific styles that work well with SwiftUI
