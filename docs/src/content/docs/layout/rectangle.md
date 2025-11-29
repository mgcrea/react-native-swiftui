---
title: Rectangle
description: Simple rectangular shape component
---

The `Rectangle` component renders a simple rectangular shape, useful for backgrounds, dividers, and placeholders.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.Rectangle
  style={{
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties for the rectangle |

## Styling

Use the `style` prop to customize the rectangle:

```tsx
<SwiftUI.Rectangle
  style={{
    width: 200,
    height: 100,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0051a8',
  }}
/>
```

## Examples

### Color Swatches

```tsx
<SwiftUI.HStack spacing={8}>
  <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: '#FF3B30', borderRadius: 8 }} />
  <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: '#FF9500', borderRadius: 8 }} />
  <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: '#FFCC00', borderRadius: 8 }} />
  <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: '#34C759', borderRadius: 8 }} />
  <SwiftUI.Rectangle style={{ width: 40, height: 40, backgroundColor: '#007AFF', borderRadius: 8 }} />
</SwiftUI.HStack>
```

### Divider

```tsx
<SwiftUI.VStack spacing={16}>
  <SwiftUI.Text text="Section 1" />
  <SwiftUI.Rectangle
    style={{
      height: 1,
      backgroundColor: '#e0e0e0',
    }}
  />
  <SwiftUI.Text text="Section 2" />
</SwiftUI.VStack>
```

### Placeholder Image

```tsx
<SwiftUI.Rectangle
  style={{
    width: 200,
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  }}
/>
```

### Color Indicator

```tsx
<SwiftUI.HStack spacing={12}>
  <SwiftUI.Rectangle
    style={{
      width: 12,
      height: 12,
      backgroundColor: status === 'active' ? '#34C759' : '#FF3B30',
      borderRadius: 6,
    }}
  />
  <SwiftUI.Text text={status} />
</SwiftUI.HStack>
```

### Progress Bar Background

```tsx
<SwiftUI.ZStack alignment="leading">
  <SwiftUI.Rectangle
    style={{
      width: 200,
      height: 8,
      backgroundColor: '#e0e0e0',
      borderRadius: 4,
    }}
  />
  <SwiftUI.Rectangle
    style={{
      width: 200 * progress,
      height: 8,
      backgroundColor: '#007AFF',
      borderRadius: 4,
    }}
  />
</SwiftUI.ZStack>
```

### Card Background

```tsx
<SwiftUI.ZStack>
  <SwiftUI.Rectangle
    style={{
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
    }}
  />
  <SwiftUI.VStack alignment="leading" style={{ padding: 16 }}>
    <SwiftUI.Text text="Card Title" style={{ font: 'headline' }} />
    <SwiftUI.Text text="Card content goes here" />
  </SwiftUI.VStack>
</SwiftUI.ZStack>
```

### Color Picker Preview

```tsx
const [red, setRed] = useState(128);
const [green, setGreen] = useState(128);
const [blue, setBlue] = useState(128);

<SwiftUI.VStack spacing={16}>
  <SwiftUI.Rectangle
    style={{
      width: 100,
      height: 100,
      backgroundColor: `rgb(${red}, ${green}, ${blue})`,
      borderRadius: 12,
    }}
  />
  <SwiftUI.Slider label={`Red: ${red}`} value={red} maximum={255} onChange={setRed} />
  <SwiftUI.Slider label={`Green: ${green}`} value={green} maximum={255} onChange={setGreen} />
  <SwiftUI.Slider label={`Blue: ${blue}`} value={blue} maximum={255} onChange={setBlue} />
</SwiftUI.VStack>
```

### Grid of Rectangles

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible' },
    { type: 'flexible' },
    { type: 'flexible' },
  ]}
  spacing={8}
>
  {[...Array(9)].map((_, i) => (
    <SwiftUI.Rectangle
      key={i}
      style={{
        height: 80,
        backgroundColor: `hsl(${i * 40}, 70%, 60%)`,
        borderRadius: 8,
      }}
    />
  ))}
</SwiftUI.LazyVGrid>
```
