---
title: VStack
description: Vertical layout container
---

The `VStack` component arranges its children vertically in a column.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.VStack>
  <SwiftUI.Text text="Top" />
  <SwiftUI.Text text="Bottom" />
</SwiftUI.VStack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alignment` | `"leading" \| "center" \| "trailing"` | `"center"` | Horizontal alignment of children |
| `spacing` | `number` | - | Space between children |
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties |
| `children` | `ReactNode` | - | Child components |

## Alignment

Control horizontal alignment of items:

```tsx
<SwiftUI.HStack spacing={20}>
  <SwiftUI.VStack alignment="leading" style={{ width: 100, backgroundColor: '#f0f0f0' }}>
    <SwiftUI.Text text="Leading" />
    <SwiftUI.Text text="Aligned" />
  </SwiftUI.VStack>

  <SwiftUI.VStack alignment="center" style={{ width: 100, backgroundColor: '#f0f0f0' }}>
    <SwiftUI.Text text="Center" />
    <SwiftUI.Text text="Aligned" />
  </SwiftUI.VStack>

  <SwiftUI.VStack alignment="trailing" style={{ width: 100, backgroundColor: '#f0f0f0' }}>
    <SwiftUI.Text text="Trailing" />
    <SwiftUI.Text text="Aligned" />
  </SwiftUI.VStack>
</SwiftUI.HStack>
```

## Spacing

Add space between children:

```tsx
<SwiftUI.VStack spacing={16}>
  <SwiftUI.Text text="Item 1" />
  <SwiftUI.Text text="Item 2" />
  <SwiftUI.Text text="Item 3" />
</SwiftUI.VStack>
```

## Examples

### Page Layout

```tsx
<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.VStack>
    <SwiftUI.Text text="Welcome" style={{ font: 'largeTitle' }} />
    <SwiftUI.Form>
      {/* Form content */}
    </SwiftUI.Form>
  </SwiftUI.VStack>
</SwiftUI>
```

### Card Content

```tsx
<SwiftUI.VStack alignment="leading" spacing={8} style={{ padding: 16 }}>
  <SwiftUI.Text text="Card Title" style={{ font: 'headline' }} />
  <SwiftUI.Text text="This is the card description that provides more details." />
  <SwiftUI.Button title="Learn More" onPress={handleLearnMore} />
</SwiftUI.VStack>
```

### Profile Header

```tsx
<SwiftUI.VStack spacing={12}>
  <SwiftUI.Image
    source={{ uri: user.avatarUrl }}
    style={{ width: 100, height: 100, borderRadius: 50 }}
  />
  <SwiftUI.Text text={user.name} style={{ font: 'title' }} />
  <SwiftUI.Text text={user.bio} style={{ color: '#666' }} />
</SwiftUI.VStack>
```

### Empty State

```tsx
<SwiftUI.VStack spacing={20}>
  <SwiftUI.Image
    name="system:folder.badge.questionmark"
    style={{ width: 64, height: 64, color: '#ccc' }}
  />
  <SwiftUI.Text text="No Items" style={{ font: 'headline' }} />
  <SwiftUI.Text
    text="You don't have any items yet. Create one to get started."
    style={{ color: '#666', textAlign: 'center' }}
  />
  <SwiftUI.Button
    title="Create Item"
    buttonStyle="borderedProminent"
    onPress={handleCreate}
  />
</SwiftUI.VStack>
```

### Stacked Buttons

```tsx
<SwiftUI.VStack spacing={12}>
  <SwiftUI.Button
    title="Continue with Apple"
    buttonStyle="borderedProminent"
    onPress={handleApple}
  />
  <SwiftUI.Button
    title="Continue with Google"
    buttonStyle="bordered"
    onPress={handleGoogle}
  />
  <SwiftUI.Button
    title="Continue with Email"
    buttonStyle="bordered"
    onPress={handleEmail}
  />
</SwiftUI.VStack>
```

### Nested Stacks

```tsx
<SwiftUI.VStack spacing={20}>
  <SwiftUI.HStack spacing={16}>
    <SwiftUI.Rectangle style={{ width: 60, height: 60, backgroundColor: 'blue', borderRadius: 8 }} />
    <SwiftUI.VStack alignment="leading">
      <SwiftUI.Text text="Main Title" style={{ font: 'headline' }} />
      <SwiftUI.Text text="Subtitle text here" style={{ color: '#666' }} />
    </SwiftUI.VStack>
  </SwiftUI.HStack>

  <SwiftUI.HStack spacing={16}>
    <SwiftUI.Rectangle style={{ width: 60, height: 60, backgroundColor: 'green', borderRadius: 8 }} />
    <SwiftUI.VStack alignment="leading">
      <SwiftUI.Text text="Another Title" style={{ font: 'headline' }} />
      <SwiftUI.Text text="More subtitle text" style={{ color: '#666' }} />
    </SwiftUI.VStack>
  </SwiftUI.HStack>
</SwiftUI.VStack>
```
