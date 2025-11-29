---
title: LazyVGrid
description: Vertical grid layout with lazy loading
---

The `LazyVGrid` component arranges its children in a vertical grid with customizable columns.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible' },
    { type: 'flexible' },
  ]}
>
  <SwiftUI.Text text="Item 1" />
  <SwiftUI.Text text="Item 2" />
  <SwiftUI.Text text="Item 3" />
  <SwiftUI.Text text="Item 4" />
</SwiftUI.LazyVGrid>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `GridItemConfig[]` | **Required** | Column configuration array |
| `spacing` | `number` | - | Vertical spacing between rows |
| `alignment` | `"leading" \| "center" \| "trailing"` | - | Horizontal alignment |
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties |
| `children` | `ReactNode` | - | Grid items |

## Column Configuration

Each column is defined by a `GridItemConfig` object:

| Property | Type | Description |
|----------|------|-------------|
| `type` | `"fixed" \| "flexible" \| "adaptive"` | Column type |
| `fixed` | `number` | Fixed width (for `fixed` type) |
| `minimum` | `number` | Minimum width (for `flexible`/`adaptive`) |
| `maximum` | `number` | Maximum width (for `flexible`/`adaptive`) |
| `spacing` | `number` | Spacing after this column |
| `alignment` | `"leading" \| "center" \| "trailing"` | Item alignment in column |

## Column Types

### Fixed Width

Columns with exact pixel width:

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'fixed', fixed: 100 },
    { type: 'fixed', fixed: 100 },
  ]}
>
  {/* Items */}
</SwiftUI.LazyVGrid>
```

### Flexible Width

Columns that share available space:

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible' },
    { type: 'flexible' },
    { type: 'flexible' },
  ]}
>
  {/* Items */}
</SwiftUI.LazyVGrid>
```

### Flexible with Constraints

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible', minimum: 80, maximum: 150 },
    { type: 'flexible', minimum: 80, maximum: 150 },
  ]}
>
  {/* Items */}
</SwiftUI.LazyVGrid>
```

### Adaptive

Automatically determines the number of columns based on available width:

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'adaptive', minimum: 100 },
  ]}
>
  {/* Items */}
</SwiftUI.LazyVGrid>
```

## Examples

### Photo Grid

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible', minimum: 100 },
    { type: 'flexible', minimum: 100 },
    { type: 'flexible', minimum: 100 },
  ]}
  spacing={4}
>
  {photos.map((photo, index) => (
    <SwiftUI.Image
      key={index}
      source={{ uri: photo.url }}
      resizeMode="cover"
      style={{ width: '100%', height: 100 }}
    />
  ))}
</SwiftUI.LazyVGrid>
```

### Product Grid

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible', minimum: 150 },
    { type: 'flexible', minimum: 150 },
  ]}
  spacing={16}
>
  {products.map(product => (
    <SwiftUI.VStack key={product.id} alignment="leading" spacing={8}>
      <SwiftUI.Image
        source={{ uri: product.imageUrl }}
        resizeMode="cover"
        style={{ width: '100%', height: 120, borderRadius: 8 }}
      />
      <SwiftUI.Text text={product.name} style={{ font: 'headline' }} />
      <SwiftUI.Text text={`$${product.price}`} style={{ color: '#007AFF' }} />
    </SwiftUI.VStack>
  ))}
</SwiftUI.LazyVGrid>
```

### Icon Grid

```tsx
const icons = ['star', 'heart', 'bell', 'gear', 'person', 'house'];

<SwiftUI.LazyVGrid
  columns={[
    { type: 'adaptive', minimum: 60 },
  ]}
  spacing={20}
>
  {icons.map(icon => (
    <SwiftUI.VStack key={icon} spacing={4}>
      <SwiftUI.Image
        name={`system:${icon}.fill`}
        style={{ width: 32, height: 32, color: '#007AFF' }}
      />
      <SwiftUI.Text text={icon} style={{ fontSize: 12 }} />
    </SwiftUI.VStack>
  ))}
</SwiftUI.LazyVGrid>
```

### Color Palette

```tsx
const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#5856D6'];

<SwiftUI.LazyVGrid
  columns={[
    { type: 'flexible' },
    { type: 'flexible' },
    { type: 'flexible' },
  ]}
  spacing={8}
>
  {colors.map(color => (
    <SwiftUI.Rectangle
      key={color}
      style={{
        backgroundColor: color,
        height: 60,
        borderRadius: 8,
      }}
    />
  ))}
</SwiftUI.LazyVGrid>
```

### Mixed Column Widths

```tsx
<SwiftUI.LazyVGrid
  columns={[
    { type: 'fixed', fixed: 60 },
    { type: 'flexible' },
    { type: 'fixed', fixed: 80 },
  ]}
  spacing={12}
>
  {items.map(item => (
    <>
      <SwiftUI.Image source={{ uri: item.icon }} style={{ width: 50, height: 50 }} />
      <SwiftUI.Text text={item.name} />
      <SwiftUI.Text text={item.price} style={{ textAlign: 'right' }} />
    </>
  ))}
</SwiftUI.LazyVGrid>
```
