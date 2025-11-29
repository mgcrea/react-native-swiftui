---
title: SFSymbol
description: Apple SF Symbols with full customization
---

The `SFSymbol` component renders Apple SF Symbols with support for sizes, weights, colors, rendering modes, and variable values.

## Import

```tsx
import { SFSymbol } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SFSymbol name="star.fill" size={24} color="#FFD700" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **Required** | SF Symbol name |
| `size` | `number \| SFSymbolTextStyle` | - | Size in points or text style |
| `color` | `ColorValue` | - | Symbol color |
| `colors` | `ColorValue[]` | - | Multiple colors for palette rendering |
| `weight` | `SFSymbolWeight` | - | Symbol weight |
| `scale` | `SFSymbolScale` | - | Symbol scale |
| `renderingMode` | `SFSymbolRenderingMode` | - | Rendering mode |
| `variableValue` | `number` | - | Variable value (0-1) |
| `style` | `StyleProp<TextStyle>` | - | Style properties |

## Size

### Point Size

```tsx
<SFSymbol name="star.fill" size={12} />
<SFSymbol name="star.fill" size={24} />
<SFSymbol name="star.fill" size={48} />
```

### Text Style Size

Use built-in text styles for consistent sizing:

```tsx
<SFSymbol name="star.fill" size="caption" />
<SFSymbol name="star.fill" size="body" />
<SFSymbol name="star.fill" size="headline" />
<SFSymbol name="star.fill" size="title" />
<SFSymbol name="star.fill" size="largeTitle" />
```

Available text styles: `caption2`, `caption`, `footnote`, `subheadline`, `callout`, `body`, `headline`, `title3`, `title2`, `title`, `largeTitle`

## Weight

```tsx
<SFSymbol name="circle" weight="ultraLight" />
<SFSymbol name="circle" weight="thin" />
<SFSymbol name="circle" weight="light" />
<SFSymbol name="circle" weight="regular" />
<SFSymbol name="circle" weight="medium" />
<SFSymbol name="circle" weight="semibold" />
<SFSymbol name="circle" weight="bold" />
<SFSymbol name="circle" weight="heavy" />
<SFSymbol name="circle" weight="black" />
```

## Scale

```tsx
<SFSymbol name="star.fill" scale="small" />
<SFSymbol name="star.fill" scale="medium" />
<SFSymbol name="star.fill" scale="large" />
```

## Rendering Modes

### Monochrome

Single color:

```tsx
<SFSymbol
  name="cloud.sun.rain.fill"
  size={40}
  renderingMode="monochrome"
  color="#007AFF"
/>
```

### Hierarchical

Primary color with automatic opacity levels:

```tsx
<SFSymbol
  name="cloud.sun.rain.fill"
  size={40}
  renderingMode="hierarchical"
  color="#007AFF"
/>
```

### Palette

Multiple custom colors:

```tsx
<SFSymbol
  name="cloud.sun.rain.fill"
  size={40}
  renderingMode="palette"
  colors={['#007AFF', '#FF9500', '#34C759']}
/>
```

### Multicolor

System-defined colors:

```tsx
<SFSymbol
  name="cloud.sun.rain.fill"
  size={40}
  renderingMode="multicolor"
/>
```

## Variable Value

For symbols that support variable values (0 to 1):

```tsx
const [volume, setVolume] = useState(0.5);

<SFSymbol
  name="speaker.wave.3.fill"
  size={32}
  variableValue={volume}
  color="#007AFF"
/>
```

Symbols with variable value support:
- `speaker.wave.3.fill` - Volume indicator
- `wifi` - Signal strength
- `chart.bar.fill` - Progress bars
- Battery symbols
- Signal strength symbols

## Examples

### Tab Bar Icons

```tsx
<View style={styles.tabBar}>
  <TouchableOpacity style={styles.tab}>
    <SFSymbol name="house.fill" size={24} color={active === 'home' ? '#007AFF' : '#8E8E93'} />
    <Text style={styles.tabLabel}>Home</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.tab}>
    <SFSymbol name="magnifyingglass" size={24} color={active === 'search' ? '#007AFF' : '#8E8E93'} />
    <Text style={styles.tabLabel}>Search</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.tab}>
    <SFSymbol name="person.fill" size={24} color={active === 'profile' ? '#007AFF' : '#8E8E93'} />
    <Text style={styles.tabLabel}>Profile</Text>
  </TouchableOpacity>
</View>
```

### Status Icons

```tsx
<View style={styles.row}>
  <SFSymbol name="checkmark.circle.fill" size={22} color="#34C759" />
  <Text>Completed</Text>
</View>
<View style={styles.row}>
  <SFSymbol name="circle" size={22} color="#8E8E93" />
  <Text>Pending</Text>
</View>
<View style={styles.row}>
  <SFSymbol name="exclamationmark.circle.fill" size={22} color="#FF3B30" />
  <Text>Error</Text>
</View>
```

### Badge Icons

```tsx
<SFSymbol
  name="person.crop.circle.badge.checkmark"
  size={32}
  renderingMode="palette"
  colors={['#007AFF', '#34C759']}
/>

<SFSymbol
  name="folder.fill.badge.plus"
  size={32}
  renderingMode="palette"
  colors={['#FF9500', '#34C759']}
/>

<SFSymbol
  name="bell.badge.fill"
  size={32}
  renderingMode="palette"
  colors={['#FF9500', '#FF3B30']}
/>
```

### Color Variants

```tsx
<View style={styles.row}>
  <SFSymbol name="heart.fill" size={24} color="#FF3B30" />
  <SFSymbol name="star.fill" size={24} color="#FF9500" />
  <SFSymbol name="bolt.fill" size={24} color="#FFCC00" />
  <SFSymbol name="leaf.fill" size={24} color="#34C759" />
  <SFSymbol name="drop.fill" size={24} color="#007AFF" />
</View>
```

### Dynamic Volume Control

```tsx
const [volume, setVolume] = useState(0.5);

<View style={styles.container}>
  <SFSymbol
    name="speaker.wave.3.fill"
    size={48}
    variableValue={volume}
    color="#007AFF"
  />
  <Slider
    value={volume}
    onValueChange={setVolume}
    minimumValue={0}
    maximumValue={1}
  />
</View>
```

## Finding Symbol Names

Browse available symbols in Apple's SF Symbols app or at:
- [SF Symbols Browser](https://developer.apple.com/sf-symbols/)
- [SF Symbols 5](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
