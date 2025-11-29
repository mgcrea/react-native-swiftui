---
title: How It Works
description: Understanding the SwiftUI bridge architecture
---

React Native SwiftUI bridges React components to native SwiftUI views using React Native's Fabric renderer. This page explains the architecture and key concepts.

## Architecture Overview

**React Side** (what you write):

```tsx
<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.Form>
    <SwiftUI.Section header="Profile">
      <SwiftUI.TextField label="Name" text={name} onChange={setName} />
      <SwiftUI.Toggle label="Active" isOn={active} onChange={setActive} />
    </SwiftUI.Section>
  </SwiftUI.Form>
</SwiftUI>
```

**Native Side** (what renders):

```swift
Form {
    Section(header: Text("Profile")) {
        TextField("Name", text: $name)
        Toggle("Active", isOn: $active)
    }
}
```

## Key Concepts

### 1. View Tree Registration

SwiftUI components don't render React Native views. Instead, they register themselves in a virtual tree:

- **Components return `null`** — No React Native views are created
- **Tree is serialized** — Component hierarchy is passed to native code
- **Native rendering** — SwiftUI renders the entire tree natively

```tsx
// Each component registers itself with type and props
<SwiftUI.TextField label="Name" text={name} onChange={setName} />

// Internally creates a node:
// { type: "TextField", props: { label: "Name", text: "..." } }
```

### 2. The SwiftUI Root Container

The `SwiftUI` component acts as the bridge between React and native:

| Responsibility          | Description                                      |
| ----------------------- | ------------------------------------------------ |
| Context Provider        | Manages component registration and event routing |
| Native View Host        | Creates the native Fabric component              |
| Tree Serialization      | Converts React tree to native view tree          |
| Event Dispatch          | Routes native events to React handlers           |

```tsx
<SwiftUI style={{ flex: 1 }} debug>
  {/* All SwiftUI components must be inside this container */}
</SwiftUI>
```

### 3. Event Handling

Events flow from native SwiftUI back to React:

1. **User interaction** — User taps toggle, types in text field
2. **Native event** — SwiftUI fires change event with new value
3. **Bridge dispatch** — Event sent through Fabric to JavaScript
4. **Handler callback** — Your `onChange` function is called
5. **State update** — React re-renders with new value

```tsx
<SwiftUI.TextField
  text={value}           // Current value passed to native
  onChange={setValue}    // Called when native value changes
  onFocus={() => {}}     // Called on native focus event
  onBlur={() => {}}      // Called on native blur event
/>
```

### 4. Style Translation

React Native styles are translated to SwiftUI modifiers:

| React Native Style | SwiftUI Modifier |
|-------------------|------------------|
| `backgroundColor` | `.background()` |
| `color` | `.foregroundColor()` |
| `fontSize` | `.font()` |
| `padding` | `.padding()` |
| `borderRadius` | `.cornerRadius()` |

```tsx
<SwiftUI.Text
  text="Hello"
  style={{
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  }}
/>

// Translates to SwiftUI:
// Text("Hello")
//   .foregroundColor(Color(hex: "#007AFF"))
//   .font(.system(size: 18, weight: .bold))
```

## Architecture Benefits

### Native Performance

Unlike web-based or JavaScript-rendered UI:

- **No JavaScript layout** — SwiftUI handles all layout natively
- **Native animations** — System animations, not JavaScript-driven
- **60fps guaranteed** — No bridge overhead during interactions

### Platform Authenticity

Components match iOS exactly:

- **System fonts** — SF Pro with proper weight mappings
- **System colors** — Automatic dark mode support
- **Native behaviors** — Keyboard handling, haptics, accessibility

### Fabric Integration

Built on React Native's modern architecture:

- **Synchronous rendering** — Faster initial paint
- **Concurrent features** — Works with React 18 features
- **Type-safe codegen** — Native specs generated from TypeScript

## Limitations

### iOS Only

SwiftUI is an Apple framework. For cross-platform apps:

```tsx
import { Platform } from 'react-native';

{Platform.OS === 'ios' ? (
  <SwiftUI style={{ flex: 1 }}>
    <SwiftUI.Form>...</SwiftUI.Form>
  </SwiftUI>
) : (
  <AndroidForm />
)}
```

### No Mixed Content

React Native views cannot be placed inside the SwiftUI tree:

```tsx
// ❌ Won't work
<SwiftUI.Form>
  <View><Text>RN View inside SwiftUI</Text></View>
</SwiftUI.Form>

// ✅ Use SwiftUI components
<SwiftUI.Form>
  <SwiftUI.Text text="SwiftUI Text" />
</SwiftUI.Form>
```

### New Architecture Required

Requires React Native 0.76+ with Fabric enabled. The legacy architecture is not supported.

## What's Next?

- Explore available [Components](/components/overview/)
- Learn about [Styling](/guides/styling/)
- See complete [Examples](/examples/basic-form/)
