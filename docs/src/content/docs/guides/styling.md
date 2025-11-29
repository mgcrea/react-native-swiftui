---
title: Styling
description: Styling SwiftUI components
---

This guide covers how to style SwiftUI components using the `style` prop.

## Style Types

### NativeViewStyle

Base style properties for containers and layout components:

```tsx
type NativeViewStyle = {
  // Colors
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  tint?: ColorValue;
  tintColor?: ColorValue;
  accentColor?: ColorValue;
  foregroundColor?: ColorValue;

  // Border
  borderWidth?: number;
  borderRadius?: number;
  cornerRadius?: number;

  // Padding
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;

  // Size
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;

  // Position
  position?: 'absolute' | 'relative';
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;

  // Theme
  preferredColorScheme?: 'light' | 'dark';
};
```

### NativeTextStyle

Extended style properties for text-containing components:

```tsx
type NativeTextStyle = NativeViewStyle & {
  // Text
  color?: ColorValue;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';

  // Native font
  font?: NativeFont;
};
```

## Native Fonts

SwiftUI provides built-in font styles:

```tsx
<SwiftUI.Text text="Large Title" style={{ font: 'largeTitle' }} />
<SwiftUI.Text text="Title" style={{ font: 'title' }} />
<SwiftUI.Text text="Title 2" style={{ font: 'title2' }} />
<SwiftUI.Text text="Title 3" style={{ font: 'title3' }} />
<SwiftUI.Text text="Headline" style={{ font: 'headline' }} />
<SwiftUI.Text text="Subheadline" style={{ font: 'subheadline' }} />
<SwiftUI.Text text="Body" style={{ font: 'body' }} />
<SwiftUI.Text text="Callout" style={{ font: 'callout' }} />
<SwiftUI.Text text="Footnote" style={{ font: 'footnote' }} />
<SwiftUI.Text text="Caption" style={{ font: 'caption' }} />
<SwiftUI.Text text="Caption 2" style={{ font: 'caption2' }} />
```

## Apple System Colors

The library exports `APPLE_COLORS` with all Apple system colors:

```tsx
import { APPLE_COLORS } from '@mgcrea/react-native-swiftui';

<SwiftUI.Text
  text="System Blue"
  style={{ color: APPLE_COLORS.systemBlue.light }}
/>
```

### Available Colors

Each color has four variants: `light`, `dark`, `contrastLight`, `contrastDark`

**System Colors:**
- `systemBlue`, `systemGreen`, `systemIndigo`, `systemOrange`
- `systemPink`, `systemPurple`, `systemRed`, `systemTeal`, `systemYellow`

**Gray Scale:**
- `systemGray`, `systemGray2`, `systemGray3`
- `systemGray4`, `systemGray5`, `systemGray6`

**Backgrounds:**
- `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`
- `systemGroupedBackground`, `secondarySystemGroupedBackground`, `tertiarySystemGroupedBackground`

**Fills:**
- `systemFill`, `secondarySystemFill`, `tertiarySystemFill`, `quaternarySystemFill`

**Text:**
- `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`
- `lightText`, `darkText`, `link`, `placeholderText`

**Separators:**
- `separator`, `opaqueSeparator`

### Using with Appearance

```tsx
import { useColorScheme } from 'react-native';
import { APPLE_COLORS } from '@mgcrea/react-native-swiftui';

function MyComponent() {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === 'dark'
    ? APPLE_COLORS.label.dark
    : APPLE_COLORS.label.light;

  return (
    <SwiftUI.Text
      text="Adaptive Text"
      style={{ color: textColor }}
    />
  );
}
```

## Component Styling Examples

### Text

```tsx
<SwiftUI.Text
  text="Styled Text"
  style={{
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }}
/>
```

### Button

```tsx
<SwiftUI.Button
  title="Styled Button"
  style={{
    backgroundColor: '#007AFF',
    color: 'white',
    padding: 12,
    borderRadius: 8,
  }}
  onPress={() => {}}
/>
```

### Rectangle

```tsx
<SwiftUI.Rectangle
  style={{
    width: 100,
    height: 100,
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#CC0000',
  }}
/>
```

### VStack

```tsx
<SwiftUI.VStack
  style={{
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  }}
>
  <SwiftUI.Text text="Content" />
</SwiftUI.VStack>
```

### Form

```tsx
<SwiftUI.Form
  style={{
    accentColor: '#FF9500',
  }}
>
  {/* Form content with orange accent */}
</SwiftUI.Form>
```

## Tint and Accent Colors

Control component accent colors:

```tsx
// Form-level accent
<SwiftUI.Form style={{ accentColor: '#FF9500' }}>
  <SwiftUI.Toggle label="Toggle" isOn={value} onChange={setValue} />
</SwiftUI.Form>

// Component-level tint
<SwiftUI.Picker
  selection={value}
  options={options}
  style={{ tintColor: '#34C759' }}
  onChange={setValue}
/>
```

## Foreground Color

Set text/icon color for components:

```tsx
<SwiftUI.Button
  title="Custom Color"
  style={{ foregroundColor: '#FF3B30' }}
  onPress={() => {}}
/>

<SwiftUI.Image
  name="system:star.fill"
  style={{ foregroundColor: '#FFD700' }}
/>
```

## Platform Colors

Use React Native's `PlatformColor` for dynamic colors:

```tsx
import { PlatformColor } from 'react-native';

<SwiftUI.Text
  text="System Label"
  style={{ color: PlatformColor('label') }}
/>

<SwiftUI.Rectangle
  style={{
    backgroundColor: PlatformColor('systemBackground'),
    borderColor: PlatformColor('separator'),
    borderWidth: 1,
  }}
/>
```

## Dark Mode

Use `preferredColorScheme` to force a color scheme:

```tsx
<SwiftUI.Form style={{ preferredColorScheme: 'dark' }}>
  {/* Always dark mode */}
</SwiftUI.Form>

<SwiftUI.Form style={{ preferredColorScheme: 'light' }}>
  {/* Always light mode */}
</SwiftUI.Form>
```

## Tips

1. **Use native fonts** - Prefer `font` over `fontSize` for consistent iOS typography
2. **Use system colors** - `APPLE_COLORS` provides colors that adapt to accessibility settings
3. **Use PlatformColor** - For truly dynamic colors that respect system appearance
4. **Accent colors cascade** - Set on Form to affect all children
5. **Border radius** - Use `borderRadius` or `cornerRadius` (both work)
