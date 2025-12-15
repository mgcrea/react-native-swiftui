---
title: Slider
description: Range value selector component
---

The `Slider` component allows users to select a value from a continuous range.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [volume, setVolume] = useState(50);

<SwiftUI.Slider
  label="Volume"
  value={volume}
  minimum={0}
  maximum={100}
  onChange={setVolume}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current slider value |
| `minimum` | `number` | `0` | Minimum value |
| `maximum` | `number` | `1` | Maximum value |
| `step` | `number` | - | Step increment |
| `label` | `string` | - | Label text |
| `labelStyle` | `StyleProp<NativeTextStyle>` | - | Style for the label text |
| `disabled` | `boolean` | `false` | Disable slider |
| `onChange` | `(value: number) => void` | - | Called when value changes |
| `onFocus` | `() => void` | - | Called when slider is focused |
| `onBlur` | `() => void` | - | Called when slider loses focus |
| `children` | `ReactNode` | - | Custom content |

:::note
The slider uses debouncing (100ms) internally to prevent excessive updates during dragging.
:::

## Examples

### Volume Control

```tsx
const [volume, setVolume] = useState(50);

<SwiftUI.Section header="Audio">
  <SwiftUI.Slider
    label={`Volume: ${volume}%`}
    value={volume}
    minimum={0}
    maximum={100}
    onChange={setVolume}
  />
</SwiftUI.Section>
```

### With Step Increment

```tsx
const [rating, setRating] = useState(3);

<SwiftUI.Slider
  label={`Rating: ${rating} stars`}
  value={rating}
  minimum={1}
  maximum={5}
  step={1}
  onChange={setRating}
/>
```

### Brightness Control

```tsx
const [brightness, setBrightness] = useState(0.8);

<SwiftUI.HStack>
  <SwiftUI.Image name="system:sun.min" />
  <SwiftUI.Slider
    value={brightness}
    minimum={0}
    maximum={1}
    onChange={setBrightness}
  />
  <SwiftUI.Image name="system:sun.max" />
</SwiftUI.HStack>
```

### Multiple Sliders

```tsx
const [red, setRed] = useState(128);
const [green, setGreen] = useState(128);
const [blue, setBlue] = useState(128);

<SwiftUI.Form>
  <SwiftUI.Section header="Color Mixer">
    <SwiftUI.Slider
      label={`Red: ${red}`}
      value={red}
      minimum={0}
      maximum={255}
      step={1}
      onChange={setRed}
    />
    <SwiftUI.Slider
      label={`Green: ${green}`}
      value={green}
      minimum={0}
      maximum={255}
      step={1}
      onChange={setGreen}
    />
    <SwiftUI.Slider
      label={`Blue: ${blue}`}
      value={blue}
      minimum={0}
      maximum={255}
      step={1}
      onChange={setBlue}
    />
    <SwiftUI.Rectangle
      style={{
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        height: 50,
        borderRadius: 8,
      }}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Disabled Slider

```tsx
<SwiftUI.Slider
  label="Locked Value"
  value={50}
  minimum={0}
  maximum={100}
  disabled
  onChange={() => {}}
/>
```
