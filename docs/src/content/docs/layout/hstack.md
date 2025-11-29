---
title: HStack
description: Horizontal layout container
---

The `HStack` component arranges its children horizontally in a row.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.HStack>
  <SwiftUI.Text text="Left" />
  <SwiftUI.Text text="Right" />
</SwiftUI.HStack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alignment` | `"top" \| "center" \| "bottom" \| "firstTextBaseline" \| "lastTextBaseline"` | `"center"` | Vertical alignment of children |
| `spacing` | `number` | - | Space between children |
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties |
| `children` | `ReactNode` | - | Child components |

## Alignment

Control vertical alignment of items:

```tsx
<SwiftUI.VStack spacing={20}>
  <SwiftUI.HStack alignment="top" style={{ height: 60, backgroundColor: '#f0f0f0' }}>
    <SwiftUI.Text text="Top" />
    <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: 'blue' }} />
  </SwiftUI.HStack>

  <SwiftUI.HStack alignment="center" style={{ height: 60, backgroundColor: '#f0f0f0' }}>
    <SwiftUI.Text text="Center" />
    <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: 'blue' }} />
  </SwiftUI.HStack>

  <SwiftUI.HStack alignment="bottom" style={{ height: 60, backgroundColor: '#f0f0f0' }}>
    <SwiftUI.Text text="Bottom" />
    <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: 'blue' }} />
  </SwiftUI.HStack>
</SwiftUI.VStack>
```

## Spacing

Add space between children:

```tsx
<SwiftUI.HStack spacing={20}>
  <SwiftUI.Text text="Item 1" />
  <SwiftUI.Text text="Item 2" />
  <SwiftUI.Text text="Item 3" />
</SwiftUI.HStack>
```

## Examples

### Navigation Bar

```tsx
<SwiftUI.HStack style={{ padding: 16 }}>
  <SwiftUI.Button title="Back" onPress={goBack} />
  <SwiftUI.Spacer />
  <SwiftUI.Text text="Title" style={{ font: 'headline' }} />
  <SwiftUI.Spacer />
  <SwiftUI.Button title="Done" onPress={handleDone} />
</SwiftUI.HStack>
```

### Icon Row

```tsx
<SwiftUI.HStack spacing={16}>
  <SwiftUI.Image name="system:heart.fill" style={{ width: 24, height: 24, color: 'red' }} />
  <SwiftUI.Image name="system:star.fill" style={{ width: 24, height: 24, color: 'gold' }} />
  <SwiftUI.Image name="system:bell.fill" style={{ width: 24, height: 24, color: 'blue' }} />
</SwiftUI.HStack>
```

### Price Display

```tsx
<SwiftUI.HStack alignment="firstTextBaseline" spacing={4}>
  <SwiftUI.Text text="$" style={{ fontSize: 16 }} />
  <SwiftUI.Text text="99" style={{ fontSize: 32, fontWeight: 'bold' }} />
  <SwiftUI.Text text=".99" style={{ fontSize: 16 }} />
</SwiftUI.HStack>
```

### List Item

```tsx
<SwiftUI.HStack spacing={12}>
  <SwiftUI.Image
    source={{ uri: item.imageUrl }}
    style={{ width: 50, height: 50, borderRadius: 8 }}
  />
  <SwiftUI.VStack alignment="leading">
    <SwiftUI.Text text={item.title} style={{ font: 'headline' }} />
    <SwiftUI.Text text={item.subtitle} style={{ color: '#666' }} />
  </SwiftUI.VStack>
  <SwiftUI.Spacer />
  <SwiftUI.Image name="system:chevron.right" style={{ width: 12, height: 12, color: '#ccc' }} />
</SwiftUI.HStack>
```

### Buttons Row

```tsx
<SwiftUI.HStack spacing={12}>
  <SwiftUI.Button
    title="Cancel"
    buttonStyle="bordered"
    onPress={handleCancel}
  />
  <SwiftUI.Button
    title="Save"
    buttonStyle="borderedProminent"
    onPress={handleSave}
  />
</SwiftUI.HStack>
```

### Form Row

```tsx
<SwiftUI.Section>
  <SwiftUI.HStack>
    <SwiftUI.Text text="Quantity" />
    <SwiftUI.Spacer />
    <SwiftUI.Stepper
      value={quantity}
      minimum={1}
      maximum={10}
      onChange={setQuantity}
    />
  </SwiftUI.HStack>
</SwiftUI.Section>
```
