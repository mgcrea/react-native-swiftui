---
title: Quick Start
description: Learn the basics of using React Native SwiftUI
---

This guide will help you understand the core concepts and get you building with React Native SwiftUI quickly.

## Basic Structure

Every SwiftUI component tree must be wrapped in a `SwiftUI` root container:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { View } from 'react-native';

export function MyComponent() {
  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        {/* SwiftUI components go here */}
      </SwiftUI>
    </View>
  );
}
```

The `SwiftUI` component acts as a bridge between React Native and native SwiftUI. All SwiftUI components must be descendants of this root container.

## Using Components

Components are accessed via the `SwiftUI` namespace:

```tsx
<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.VStack>
    <SwiftUI.Text text="Hello World" />
    <SwiftUI.Button title="Press Me" onPress={() => console.log('Pressed!')} />
  </SwiftUI.VStack>
</SwiftUI>
```

## Building a Simple Form

Here's a complete example of a form with various input types:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert } from 'react-native';

export function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('system');

  const handleSubmit = () => {
    Alert.alert('Form Submitted', JSON.stringify({
      name,
      email,
      birthDate: birthDate.toISOString(),
      notifications,
      theme,
    }, null, 2));
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <SwiftUI.TextField
              label="Name"
              placeholder="Enter your name"
              text={name}
              onChange={setName}
            />
            <SwiftUI.TextField
              label="Email"
              placeholder="Enter your email"
              text={email}
              keyboardType="emailAddress"
              onChange={setEmail}
            />
            <SwiftUI.DatePicker
              label="Birth Date"
              selection={birthDate}
              displayedComponents="date"
              onChange={setBirthDate}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Preferences">
            <SwiftUI.Toggle
              label="Enable Notifications"
              isOn={notifications}
              onChange={setNotifications}
            />
            <SwiftUI.Picker
              label="Theme"
              selection={theme}
              options={['system', 'light', 'dark']}
              onChange={setTheme}
            />
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Submit"
              onPress={handleSubmit}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Key Concepts

### Components Return Null

SwiftUI components don't render React Native views - they register themselves in a view tree that's rendered natively. This means:

- Components return `null` in JSX
- Rendering happens entirely on the native side
- You can't mix React Native views inside the SwiftUI tree

### State Management

State works just like regular React:

```tsx
const [value, setValue] = useState('');

<SwiftUI.TextField
  text={value}
  onChange={setValue}
/>
```

### Event Handling

Events follow React patterns with callbacks:

```tsx
<SwiftUI.Button
  title="Press Me"
  onPress={() => console.log('Button pressed')}
/>

<SwiftUI.TextField
  text={text}
  onChange={(value) => setText(value)}
  onFocus={() => console.log('Field focused')}
  onBlur={() => console.log('Field blurred')}
/>
```

## Layout Components

Use stack components for layout:

```tsx
<SwiftUI.VStack spacing={10}>
  <SwiftUI.Text text="Vertical stack" />
  <SwiftUI.HStack spacing={20}>
    <SwiftUI.Text text="Left" />
    <SwiftUI.Spacer />
    <SwiftUI.Text text="Right" />
  </SwiftUI.HStack>
</SwiftUI.VStack>
```

## Next Steps

- Explore all available [Components](/components/overview/)
- Learn about [Layout](/layout/vstack/) options
- See [Form Integration](/guides/building-forms/) patterns
- Check out complete [Examples](/examples/basic-form/)
