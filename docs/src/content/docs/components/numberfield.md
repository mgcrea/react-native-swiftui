---
title: NumberField
description: Numeric input field with formatting options
---

The `NumberField` component provides a specialized input for numeric values with built-in formatting support.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [amount, setAmount] = useState<number | null>(100);

<SwiftUI.NumberField
  label="Amount"
  value={amount}
  onChange={setAmount}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | - | Current numeric value |
| `label` | `string` | - | Field label |
| `labelStyle` | `StyleProp<NativeTextStyle>` | - | Style for the label text |
| `placeholder` | `string` | - | Placeholder text |
| `keyboardType` | `"default" \| "numberPad" \| "decimalPad"` | - | Keyboard type |
| `returnKeyType` | `"default" \| "done" \| "next" \| "search"` | - | Return key type |
| `min` | `number \| null` | - | Minimum allowed value |
| `max` | `number \| null` | - | Maximum allowed value |
| `disabled` | `boolean` | `false` | Disable input |
| `formatter` | `NativeNumberFormatter` | - | Number formatting style |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onChange` | `(value: number \| null) => void` | - | Called when value changes |
| `onFocus` | `() => void` | - | Called when field is focused |
| `onBlur` | `() => void` | - | Called when field loses focus |

## Number Formatters

The `formatter` prop supports various formatting styles:

```tsx
<SwiftUI.NumberField
  label="Price"
  value={price}
  onChange={setPrice}
  formatter="currency"
/>
```

Available formatters:
- `currency` - Currency format (e.g., $1,234.56)
- `decimal` - Decimal format (e.g., 1,234.56)
- `percent` - Percentage format (e.g., 12.5%)
- `scientific` - Scientific notation
- `spellOut` - Spelled out (e.g., "one thousand")
- `ordinal` - Ordinal format (e.g., 1st, 2nd)
- `currencyISOCode` - Currency with ISO code
- `currencyPlural` - Currency with plural name
- `currencyAccounting` - Accounting format

## Value Constraints

Set minimum and maximum values:

```tsx
<SwiftUI.NumberField
  label="Quantity"
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={100}
/>
```

## Examples

### Currency Input

```tsx
const [amount, setAmount] = useState<number | null>(0);

<SwiftUI.Form>
  <SwiftUI.Section header="Payment">
    <SwiftUI.NumberField
      label="Amount"
      placeholder="0.00"
      value={amount}
      onChange={setAmount}
      formatter="currency"
      min={0}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Percentage Input

```tsx
const [discount, setDiscount] = useState<number | null>(10);

<SwiftUI.NumberField
  label="Discount"
  value={discount}
  onChange={setDiscount}
  formatter="percent"
  min={0}
  max={100}
/>
```

### Quantity with Range

```tsx
const [quantity, setQuantity] = useState<number | null>(1);

<SwiftUI.HStack>
  <SwiftUI.NumberField
    label="Quantity"
    value={quantity}
    onChange={setQuantity}
    min={1}
    max={99}
    keyboardType="numberPad"
  />
  <SwiftUI.Stepper
    value={quantity ?? 1}
    minimum={1}
    maximum={99}
    onChange={(v) => setQuantity(v)}
  />
</SwiftUI.HStack>
```

### Handling Null Values

The value can be `null` when the field is empty:

```tsx
const [value, setValue] = useState<number | null>(null);

<SwiftUI.NumberField
  label="Optional Number"
  placeholder="Enter a number"
  value={value}
  onChange={(newValue) => {
    // newValue is null when field is cleared
    setValue(newValue);
  }}
/>
```
