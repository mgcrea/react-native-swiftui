---
title: Group
description: Generic container for grouping components
---

The `Group` component provides a way to group multiple components without affecting layout. It's useful for applying modifiers to multiple views at once.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.Group>
  <SwiftUI.Text text="Item 1" />
  <SwiftUI.Text text="Item 2" />
  <SwiftUI.Text text="Item 3" />
</SwiftUI.Group>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties applied to all children |
| `children` | `ReactNode` | - | Child components |

## Use Cases

### Apply Style to Multiple Items

```tsx
<SwiftUI.Group style={{ color: '#007AFF' }}>
  <SwiftUI.Text text="Blue text 1" />
  <SwiftUI.Text text="Blue text 2" />
  <SwiftUI.Text text="Blue text 3" />
</SwiftUI.Group>
```

### Conditional Rendering

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Account">
    <SwiftUI.TextField label="Email" text={email} onChange={setEmail} />
    {isLoggedIn && (
      <SwiftUI.Group>
        <SwiftUI.Text text={`Welcome, ${user.name}`} />
        <SwiftUI.Button title="Sign Out" onPress={handleSignOut} />
      </SwiftUI.Group>
    )}
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Organize Related Items

```tsx
<SwiftUI.VStack>
  <SwiftUI.Group>
    <SwiftUI.Text text="Header Section" style={{ font: 'headline' }} />
    <SwiftUI.Text text="Subtitle" style={{ color: '#666' }} />
  </SwiftUI.Group>

  <SwiftUI.Group>
    <SwiftUI.Button title="Action 1" onPress={action1} />
    <SwiftUI.Button title="Action 2" onPress={action2} />
  </SwiftUI.Group>
</SwiftUI.VStack>
```

## Examples

### Dynamic List Items

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Items">
    {items.map(item => (
      <SwiftUI.Group key={item.id}>
        <SwiftUI.HStack>
          <SwiftUI.Text text={item.name} />
          <SwiftUI.Spacer />
          <SwiftUI.Text text={item.value} />
        </SwiftUI.HStack>
      </SwiftUI.Group>
    ))}
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Feature Flags

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Settings">
    <SwiftUI.Toggle label="Basic Feature" isOn={basic} onChange={setBasic} />

    {isPremiumUser && (
      <SwiftUI.Group>
        <SwiftUI.Toggle label="Premium Feature 1" isOn={prem1} onChange={setPrem1} />
        <SwiftUI.Toggle label="Premium Feature 2" isOn={prem2} onChange={setPrem2} />
        <SwiftUI.Toggle label="Premium Feature 3" isOn={prem3} onChange={setPrem3} />
      </SwiftUI.Group>
    )}
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Shared Styling

```tsx
<SwiftUI.VStack spacing={16}>
  <SwiftUI.Group style={{ padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
    <SwiftUI.Text text="Card 1 Content" />
  </SwiftUI.Group>

  <SwiftUI.Group style={{ padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
    <SwiftUI.Text text="Card 2 Content" />
  </SwiftUI.Group>
</SwiftUI.VStack>
```
