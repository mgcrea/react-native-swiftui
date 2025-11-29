---
title: ZStack
description: Overlapping layout container
---

The `ZStack` component layers its children on top of each other along the z-axis.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.ZStack>
  <SwiftUI.Rectangle style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
  <SwiftUI.Text text="Overlay" style={{ color: 'white' }} />
</SwiftUI.ZStack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alignment` | `ZStackAlignment` | `"center"` | Alignment of children |
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties |
| `children` | `ReactNode` | - | Child components |

## Alignment Options

```tsx
type ZStackAlignment =
  | "topLeading"
  | "top"
  | "topTrailing"
  | "leading"
  | "center"
  | "trailing"
  | "bottomLeading"
  | "bottom"
  | "bottomTrailing"
```

## Alignment Examples

```tsx
<SwiftUI.ZStack alignment="topLeading" style={containerStyle}>
  <SwiftUI.Rectangle style={bgStyle} />
  <SwiftUI.Text text="Top Leading" />
</SwiftUI.ZStack>

<SwiftUI.ZStack alignment="center" style={containerStyle}>
  <SwiftUI.Rectangle style={bgStyle} />
  <SwiftUI.Text text="Center" />
</SwiftUI.ZStack>

<SwiftUI.ZStack alignment="bottomTrailing" style={containerStyle}>
  <SwiftUI.Rectangle style={bgStyle} />
  <SwiftUI.Text text="Bottom Trailing" />
</SwiftUI.ZStack>
```

## Examples

### Image with Overlay Text

```tsx
<SwiftUI.ZStack alignment="bottomLeading">
  <SwiftUI.Image
    source={{ uri: 'https://example.com/photo.jpg' }}
    resizeMode="cover"
    style={{ width: 300, height: 200 }}
  />
  <SwiftUI.VStack alignment="leading" style={{ padding: 12 }}>
    <SwiftUI.Text
      text="Photo Title"
      style={{ color: 'white', font: 'headline' }}
    />
    <SwiftUI.Text
      text="Subtitle"
      style={{ color: 'white', fontSize: 12 }}
    />
  </SwiftUI.VStack>
</SwiftUI.ZStack>
```

### Badge on Icon

```tsx
<SwiftUI.ZStack alignment="topTrailing">
  <SwiftUI.Image
    name="system:bell.fill"
    style={{ width: 32, height: 32, color: '#007AFF' }}
  />
  <SwiftUI.Rectangle
    style={{
      width: 12,
      height: 12,
      backgroundColor: 'red',
      borderRadius: 6,
    }}
  />
</SwiftUI.ZStack>
```

### Notification Badge with Count

```tsx
<SwiftUI.ZStack alignment="topTrailing">
  <SwiftUI.Image
    name="system:message.fill"
    style={{ width: 28, height: 28, color: '#007AFF' }}
  />
  <SwiftUI.ZStack>
    <SwiftUI.Rectangle
      style={{
        width: 18,
        height: 18,
        backgroundColor: 'red',
        borderRadius: 9,
      }}
    />
    <SwiftUI.Text
      text="3"
      style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
    />
  </SwiftUI.ZStack>
</SwiftUI.ZStack>
```

### Card with Tag

```tsx
<SwiftUI.ZStack alignment="topTrailing">
  <SwiftUI.VStack
    alignment="leading"
    style={{
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 12,
      width: 200,
    }}
  >
    <SwiftUI.Text text="Product Name" style={{ font: 'headline' }} />
    <SwiftUI.Text text="$49.99" style={{ color: '#007AFF' }} />
  </SwiftUI.VStack>
  <SwiftUI.Text
    text="NEW"
    style={{
      backgroundColor: 'red',
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
      padding: 4,
      borderRadius: 4,
    }}
  />
</SwiftUI.ZStack>
```

### Loading Overlay

```tsx
const [isLoading, setIsLoading] = useState(false);

<SwiftUI.ZStack>
  <SwiftUI.Form>
    {/* Form content */}
  </SwiftUI.Form>

  {isLoading && (
    <SwiftUI.ZStack>
      <SwiftUI.Rectangle
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: '100%',
          height: '100%',
        }}
      />
      <SwiftUI.Text
        text="Loading..."
        style={{ color: 'white', font: 'headline' }}
      />
    </SwiftUI.ZStack>
  )}
</SwiftUI.ZStack>
```

### Layered Shapes

```tsx
<SwiftUI.ZStack>
  <SwiftUI.Rectangle
    style={{
      width: 120,
      height: 120,
      backgroundColor: '#007AFF',
      borderRadius: 20,
    }}
  />
  <SwiftUI.Rectangle
    style={{
      width: 100,
      height: 100,
      backgroundColor: '#34C759',
      borderRadius: 16,
    }}
  />
  <SwiftUI.Rectangle
    style={{
      width: 80,
      height: 80,
      backgroundColor: '#FF9500',
      borderRadius: 12,
    }}
  />
</SwiftUI.ZStack>
```
