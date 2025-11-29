---
title: Stepper
description: Increment and decrement control
---

The `Stepper` component provides plus/minus buttons for incrementing and decrementing numeric values.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [quantity, setQuantity] = useState(1);

<SwiftUI.Stepper
  label={`Quantity: ${quantity}`}
  value={quantity}
  minimum={1}
  maximum={10}
  onChange={setQuantity}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | Current value |
| `label` | `string` | - | Label text (typically includes current value) |
| `minimum` | `number` | - | Minimum allowed value |
| `maximum` | `number` | - | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement amount |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onChange` | `(value: number) => void` | - | Called when value changes |
| `onFocus` | `() => void` | - | Called when stepper is focused |
| `onBlur` | `() => void` | - | Called when stepper loses focus |
| `children` | `ReactNode` | - | Custom content |

## Examples

### Basic Counter

```tsx
const [count, setCount] = useState(0);

<SwiftUI.Stepper
  label={`Count: ${count}`}
  value={count}
  onChange={setCount}
/>
```

### With Range Limits

```tsx
const [quantity, setQuantity] = useState(1);

<SwiftUI.Section header="Shopping Cart">
  <SwiftUI.Stepper
    label={`Quantity: ${quantity}`}
    value={quantity}
    minimum={1}
    maximum={99}
    onChange={setQuantity}
  />
</SwiftUI.Section>
```

### Custom Step Amount

```tsx
const [temperature, setTemperature] = useState(72);

<SwiftUI.Stepper
  label={`Temperature: ${temperature}°F`}
  value={temperature}
  minimum={60}
  maximum={85}
  step={2}
  onChange={setTemperature}
/>
```

### Age Selector

```tsx
const [age, setAge] = useState(25);

<SwiftUI.Form>
  <SwiftUI.Section header="Profile">
    <SwiftUI.Stepper
      label={`Age: ${age} years`}
      value={age}
      minimum={0}
      maximum={120}
      onChange={setAge}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Multiple Steppers

```tsx
const [hours, setHours] = useState(8);
const [minutes, setMinutes] = useState(0);

<SwiftUI.Section header="Duration">
  <SwiftUI.Stepper
    label={`Hours: ${hours}`}
    value={hours}
    minimum={0}
    maximum={24}
    onChange={setHours}
  />
  <SwiftUI.Stepper
    label={`Minutes: ${minutes}`}
    value={minutes}
    minimum={0}
    maximum={59}
    step={5}
    onChange={setMinutes}
  />
</SwiftUI.Section>
```

### Combined with NumberField

```tsx
const [value, setValue] = useState(10);

<SwiftUI.HStack>
  <SwiftUI.NumberField
    value={value}
    onChange={(v) => setValue(v ?? 0)}
    min={0}
    max={100}
  />
  <SwiftUI.Stepper
    value={value}
    minimum={0}
    maximum={100}
    onChange={setValue}
  />
</SwiftUI.HStack>
```

### Decimal Values

```tsx
const [price, setPrice] = useState(9.99);

<SwiftUI.Stepper
  label={`Price: $${price.toFixed(2)}`}
  value={price}
  minimum={0}
  step={0.5}
  onChange={setPrice}
/>
```
