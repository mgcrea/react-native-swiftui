---
title: Image
description: Display images and SF Symbols
---

The `Image` component displays images from various sources and SF Symbols with native SwiftUI rendering.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

### From Asset

```tsx
import logo from './assets/logo.png';

<SwiftUI.Image
  source={logo}
  style={{ width: 100, height: 100 }}
/>
```

### SF Symbol

```tsx
<SwiftUI.Image
  name="system:star.fill"
  style={{ width: 24, height: 24, color: 'gold' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | SF Symbol name (prefix with `system:`) |
| `source` | `ImageSourcePropType` | - | Image source (require or uri) |
| `resizeMode` | `"cover" \| "contain" \| "stretch" \| "center"` | - | How to resize the image |
| `tintColor` | `string` | - | Color overlay for the image |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |

## Image Sources

### Local Asset

```tsx
import myImage from './assets/image.png';

<SwiftUI.Image
  source={myImage}
  resizeMode="contain"
  style={{ width: 200, height: 200 }}
/>
```

### Remote URL

```tsx
<SwiftUI.Image
  source={{ uri: 'https://example.com/image.jpg' }}
  resizeMode="cover"
  style={{ width: 200, height: 200 }}
/>
```

### SF Symbol

Use the `name` prop with `system:` prefix:

```tsx
<SwiftUI.Image
  name="system:heart.fill"
  style={{ width: 32, height: 32, color: 'red' }}
/>
```

## Resize Modes

```tsx
<SwiftUI.HStack spacing={20}>
  <SwiftUI.Image source={image} resizeMode="cover" style={imageStyle} />
  <SwiftUI.Image source={image} resizeMode="contain" style={imageStyle} />
  <SwiftUI.Image source={image} resizeMode="stretch" style={imageStyle} />
  <SwiftUI.Image source={image} resizeMode="center" style={imageStyle} />
</SwiftUI.HStack>
```

## Examples

### Profile Avatar

```tsx
<SwiftUI.Image
  source={{ uri: user.avatarUrl }}
  resizeMode="cover"
  style={{
    width: 80,
    height: 80,
    borderRadius: 40,
  }}
/>
```

### Icon Row

```tsx
<SwiftUI.HStack spacing={16}>
  <SwiftUI.Image
    name="system:house.fill"
    style={{ width: 24, height: 24, color: '#007AFF' }}
  />
  <SwiftUI.Image
    name="system:gear"
    style={{ width: 24, height: 24, color: '#007AFF' }}
  />
  <SwiftUI.Image
    name="system:person.fill"
    style={{ width: 24, height: 24, color: '#007AFF' }}
  />
</SwiftUI.HStack>
```

### Image with Tint

```tsx
<SwiftUI.Image
  source={logo}
  tintColor="#007AFF"
  resizeMode="contain"
  style={{ width: 100, height: 100 }}
/>
```

### In a Button

```tsx
<SwiftUI.Button onPress={handleShare}>
  <SwiftUI.HStack spacing={8}>
    <SwiftUI.Image
      name="system:square.and.arrow.up"
      style={{ width: 20, height: 20 }}
    />
    <SwiftUI.Text text="Share" />
  </SwiftUI.HStack>
</SwiftUI.Button>
```

### Gallery Layout

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible', minimum: 100 },
    { type: 'flexible', minimum: 100 },
    { type: 'flexible', minimum: 100 },
  ]}
  spacing={4}
>
  {images.map((image, index) => (
    <SwiftUI.Image
      key={index}
      source={{ uri: image.url }}
      resizeMode="cover"
      style={{ width: 100, height: 100 }}
    />
  ))}
</SwiftUI.LazyVGrid>
```

:::tip
For more advanced SF Symbol usage with weights, scales, and rendering modes, use the standalone [SFSymbol](/standalone/sf-symbol/) component.
:::
