---
title: Picker
description: Single value selection component with multiple styles
---

The `Picker` component provides single-value selection from a list of options with various visual styles.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [selected, setSelected] = useState('option1');

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<SwiftUI.Picker
  label="Choose Option"
  value={selected}
  options={options}
  onChange={setSelected}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Currently selected value (preferred) |
| `selection` | `string` | - | Currently selected value (deprecated, use `value`) |
| `options` | `readonly { value: string; label: string; icon?: string }[]` | - | Array of options |
| `config` | `NativePickerConfig` | - | Configuration for numeric pickers |
| `label` | `string` | - | Label text |
| `labelStyle` | `StyleProp<NativeTextStyle>` | - | Style for the label text |
| `pickerStyle` | `"default" \| "inline" \| "menu" \| "segmented" \| "wheel"` | `"default"` | Visual style |
| `disabled` | `boolean` | `false` | Disable picker |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onChange` | `(value: string) => void` | - | Called when selection changes |
| `onFocus` | `() => void` | - | Called when picker is focused |
| `onBlur` | `() => void` | - | Called when picker loses focus |

## Option Format

Options must be objects with `value` and `label` properties:

```tsx
const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];
```

For segmented pickers, you can include SF Symbol icons:

```tsx
const options = [
  { value: 'list', label: 'List', icon: 'list.bullet' },
  { value: 'grid', label: 'Grid', icon: 'square.grid.2x2' },
];
```

## Picker Styles

### Default (Menu on iOS 14+)

```tsx
const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];

<SwiftUI.Picker
  label="Select"
  value={value}
  options={options}
  pickerStyle="default"
  onChange={setValue}
/>
```

### Segmented Control

```tsx
const options = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

<SwiftUI.Picker
  label="View Mode"
  value={viewMode}
  options={options}
  pickerStyle="segmented"
  onChange={setViewMode}
/>
```

### Segmented with SF Symbols

```tsx
const options = [
  { value: 'list', label: 'List', icon: 'list.bullet' },
  { value: 'grid', label: 'Grid', icon: 'square.grid.2x2' },
  { value: 'map', label: 'Map', icon: 'map' },
];

<SwiftUI.Picker
  value={viewMode}
  options={options}
  pickerStyle="segmented"
  onChange={setViewMode}
/>
```

### Menu

```tsx
const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
];

<SwiftUI.Picker
  label="Category"
  value={category}
  options={categories}
  pickerStyle="menu"
  onChange={setCategory}
/>
```

### Wheel

```tsx
const sizes = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
];

<SwiftUI.Picker
  label="Size"
  value={size}
  options={sizes}
  pickerStyle="wheel"
  style={{ height: 216 }}
  onChange={setSize}
/>
```

### Inline

```tsx
const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

<SwiftUI.Picker
  label="Priority"
  value={priority}
  options={priorities}
  pickerStyle="inline"
  onChange={setPriority}
/>
```

## Numeric Picker with Config

For numeric ranges, use the `config` prop instead of `options`:

```tsx
<SwiftUI.Picker
  label="Age"
  value={age}
  config={{
    min: 18,
    max: 100,
    step: 1,
    suffix: ' years',
  }}
  onChange={setAge}
/>
```

Config options:
- `min` - Minimum value
- `max` - Maximum value
- `step` - Increment step (optional)
- `prefix` - Text before value (optional)
- `suffix` - Text after value (optional)

## Examples

### Theme Selector

```tsx
const [theme, setTheme] = useState('system');

const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

<SwiftUI.Section header="Appearance">
  <SwiftUI.Picker
    label="Theme"
    value={theme}
    options={themeOptions}
    pickerStyle="segmented"
    onChange={setTheme}
  />
</SwiftUI.Section>
```

### Category Filter

```tsx
const [category, setCategory] = useState('all');

const categoryOptions = [
  { value: 'all', label: 'All Items' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
];

<SwiftUI.Picker
  label="Category"
  value={category}
  options={categoryOptions}
  pickerStyle="menu"
  onChange={setCategory}
/>
```

### View Mode with Icons

```tsx
const [viewMode, setViewMode] = useState('list');

const viewOptions = [
  { value: 'list', label: 'List', icon: 'list.bullet' },
  { value: 'grid', label: 'Grid', icon: 'square.grid.2x2' },
];

<SwiftUI.Picker
  value={viewMode}
  options={viewOptions}
  pickerStyle="segmented"
  onChange={setViewMode}
/>
```

### Dynamic Options

```tsx
const [options, setOptions] = useState([
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
]);
const [selected, setSelected] = useState('opt1');

<SwiftUI.Section>
  <SwiftUI.Picker
    label="Choose"
    value={selected}
    options={options}
    onChange={setSelected}
  />
  <SwiftUI.Button
    title="Add Option"
    onPress={() => {
      const newValue = `opt${options.length + 1}`;
      setOptions([...options, { value: newValue, label: `Option ${options.length + 1}` }]);
    }}
  />
</SwiftUI.Section>
```
