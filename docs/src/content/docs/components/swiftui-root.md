---
title: SwiftUI Root
description: The root container component for all SwiftUI components
---

The `SwiftUI` component is the root container that bridges React Native and SwiftUI. All SwiftUI components must be descendants of this container.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { View } from 'react-native';

export function MyComponent() {
  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Text text="Hello SwiftUI!" />
      </SwiftUI>
    </View>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Auto-generated | Custom identifier for the root |
| `style` | `StyleProp<ViewStyle>` | - | Style applied to the native container |
| `debug` | `boolean` | `false` | Enable debug logging for component tree |
| `onEvent` | `(event: { nativeEvent: NativeSwiftUIEvent }) => void` | - | Raw event handler for all events |
| `children` | `ReactNode` | - | SwiftUI components to render |

## Debug Mode

Enable debug mode to log the component tree and events:

```tsx
<SwiftUI style={{ flex: 1 }} debug>
  <SwiftUI.Form>
    <SwiftUI.TextField label="Name" text={name} onChange={setName} />
  </SwiftUI.Form>
</SwiftUI>
```

This will log:
- Component registration/unregistration
- View tree structure
- Event dispatches

## Event Handling

The `onEvent` prop receives all events from the SwiftUI tree:

```tsx
<SwiftUI
  style={{ flex: 1 }}
  onEvent={(event) => {
    console.log('Event:', event.nativeEvent);
    // { type: 'change', id: 'textfield-1', value: 'Hello' }
  }}
>
  <SwiftUI.TextField label="Name" text={name} onChange={setName} />
</SwiftUI>
```

Events include:
- `change` - Value changes
- `press` - Button presses
- `focus` - Field focus
- `blur` - Field blur
- `dismiss` - Sheet dismissal
- `primaryAction` / `secondaryAction` - Sheet button actions

## Styling

The root component accepts standard React Native `ViewStyle`:

```tsx
<SwiftUI
  style={{
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  }}
>
  {/* ... */}
</SwiftUI>
```

## Multiple Roots

You can have multiple `SwiftUI` roots in your app, but they are independent:

```tsx
<View style={{ flex: 1 }}>
  <SwiftUI style={{ flex: 1 }}>
    <SwiftUI.Form>{/* Form 1 */}</SwiftUI.Form>
  </SwiftUI>

  <SwiftUI style={{ flex: 1 }}>
    <SwiftUI.Form>{/* Form 2 */}</SwiftUI.Form>
  </SwiftUI>
</View>
```

Each root manages its own component tree and state.
