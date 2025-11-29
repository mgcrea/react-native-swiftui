---
title: Text
description: Display text with native SwiftUI styling
---

The `Text` component displays text using SwiftUI's native text rendering.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.Text text="Hello World" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **Required** | The text content to display |
| `alignment` | `"leading" \| "center" \| "trailing"` | `"leading"` | Text alignment |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |

## Styling

```tsx
<SwiftUI.Text
  text="Styled Text"
  style={{
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }}
/>
```

### Available Style Properties

| Property | Type | Description |
|----------|------|-------------|
| `color` | `ColorValue` | Text color |
| `fontSize` | `number` | Font size in points |
| `fontWeight` | `string` | Font weight (e.g., `'bold'`, `'600'`) |
| `fontFamily` | `string` | Font family name |
| `textAlign` | `string` | Text alignment |
| `font` | `NativeFont` | SwiftUI font style |

### Native Fonts

Use SwiftUI's built-in font styles:

```tsx
<SwiftUI.Text text="Large Title" style={{ font: 'largeTitle' }} />
<SwiftUI.Text text="Headline" style={{ font: 'headline' }} />
<SwiftUI.Text text="Body" style={{ font: 'body' }} />
<SwiftUI.Text text="Caption" style={{ font: 'caption' }} />
```

Available font values:
- `largeTitle`, `title`, `title2`, `title3`
- `headline`, `subheadline`
- `body`, `callout`
- `footnote`, `caption`, `caption2`

## Examples

### Basic Text

```tsx
<SwiftUI.VStack spacing={10}>
  <SwiftUI.Text text="Default text" />
  <SwiftUI.Text text="Centered text" alignment="center" />
  <SwiftUI.Text text="Trailing text" alignment="trailing" />
</SwiftUI.VStack>
```

### Styled Text

```tsx
<SwiftUI.VStack spacing={10}>
  <SwiftUI.Text
    text="Primary Heading"
    style={{ font: 'largeTitle', fontWeight: 'bold' }}
  />
  <SwiftUI.Text
    text="Secondary text with custom color"
    style={{ color: '#666', fontSize: 14 }}
  />
</SwiftUI.VStack>
```

### Within a Form

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Information">
    <SwiftUI.Text text="This is some informational text within a form section." />
  </SwiftUI.Section>
</SwiftUI.Form>
```
