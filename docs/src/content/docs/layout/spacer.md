---
title: Spacer
description: Flexible space that expands to fill available space
---

The `Spacer` component expands to fill available space within a stack, pushing other elements apart.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.HStack>
  <SwiftUI.Text text="Left" />
  <SwiftUI.Spacer />
  <SwiftUI.Text text="Right" />
</SwiftUI.HStack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minLength` | `number` | - | Minimum length of the spacer |

## How It Works

- In an `HStack`, the spacer expands horizontally
- In a `VStack`, the spacer expands vertically
- Multiple spacers share available space equally

## Examples

### Push to Edges

```tsx
<SwiftUI.HStack style={{ padding: 16 }}>
  <SwiftUI.Button title="Cancel" onPress={handleCancel} />
  <SwiftUI.Spacer />
  <SwiftUI.Button title="Save" onPress={handleSave} />
</SwiftUI.HStack>
```

### Center Content

```tsx
<SwiftUI.HStack>
  <SwiftUI.Spacer />
  <SwiftUI.Text text="Centered" />
  <SwiftUI.Spacer />
</SwiftUI.HStack>
```

### Navigation Bar

```tsx
<SwiftUI.HStack style={{ padding: 16 }}>
  <SwiftUI.Button title="Back" onPress={goBack} />
  <SwiftUI.Spacer />
  <SwiftUI.Text text="Title" style={{ font: 'headline' }} />
  <SwiftUI.Spacer />
  <SwiftUI.Button title="Edit" onPress={handleEdit} />
</SwiftUI.HStack>
```

### Vertical Spacing

```tsx
<SwiftUI.VStack>
  <SwiftUI.Text text="Header" style={{ font: 'largeTitle' }} />
  <SwiftUI.Spacer />
  <SwiftUI.Text text="Footer" />
</SwiftUI.VStack>
```

### Bottom-Aligned Content

```tsx
<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.VStack>
    <SwiftUI.Text text="Welcome" style={{ font: 'largeTitle' }} />
    <SwiftUI.Text text="Please sign in to continue" />
    <SwiftUI.Spacer />
    <SwiftUI.Button
      title="Sign In"
      buttonStyle="borderedProminent"
      onPress={handleSignIn}
    />
  </SwiftUI.VStack>
</SwiftUI>
```

### Minimum Length

Ensure spacer has a minimum size:

```tsx
<SwiftUI.HStack>
  <SwiftUI.Text text="Label" />
  <SwiftUI.Spacer minLength={20} />
  <SwiftUI.Text text="Value" />
</SwiftUI.HStack>
```

### Multiple Spacers

Spacers divide available space equally:

```tsx
<SwiftUI.HStack>
  <SwiftUI.Text text="1" />
  <SwiftUI.Spacer />
  <SwiftUI.Text text="2" />
  <SwiftUI.Spacer />
  <SwiftUI.Text text="3" />
</SwiftUI.HStack>
```

### List Item Layout

```tsx
<SwiftUI.HStack spacing={12}>
  <SwiftUI.Image
    name="system:folder.fill"
    style={{ width: 24, height: 24, color: '#007AFF' }}
  />
  <SwiftUI.VStack alignment="leading">
    <SwiftUI.Text text="Documents" style={{ font: 'body' }} />
    <SwiftUI.Text text="12 items" style={{ fontSize: 12, color: '#666' }} />
  </SwiftUI.VStack>
  <SwiftUI.Spacer />
  <SwiftUI.Image
    name="system:chevron.right"
    style={{ width: 12, height: 12, color: '#ccc' }}
  />
</SwiftUI.HStack>
```

### Form Row

```tsx
<SwiftUI.Section>
  <SwiftUI.HStack>
    <SwiftUI.Text text="Total" style={{ font: 'headline' }} />
    <SwiftUI.Spacer />
    <SwiftUI.Text text="$99.99" style={{ font: 'headline', color: '#007AFF' }} />
  </SwiftUI.HStack>
</SwiftUI.Section>
```
