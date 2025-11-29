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

<SwiftUI.Picker
  label="Choose Option"
  selection={selected}
  options={['option1', 'option2', 'option3']}
  onChange={setSelected}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selection` | `string` | - | Currently selected value |
| `options` | `readonly (string \| { value: string; label: string })[]` | - | Array of options |
| `config` | `NativePickerConfig` | - | Configuration for numeric pickers |
| `label` | `string` | - | Label text |
| `pickerStyle` | `"default" \| "inline" \| "menu" \| "segmented" \| "wheel"` | `"default"` | Visual style |
| `disabled` | `boolean` | `false` | Disable picker |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onChange` | `(value: string) => void` | - | Called when selection changes |
| `onFocus` | `() => void` | - | Called when picker is focused |
| `onBlur` | `() => void` | - | Called when picker loses focus |

## Picker Styles

### Default (Menu on iOS 14+)

```tsx
<SwiftUI.Picker
  label="Select"
  selection={value}
  options={options}
  pickerStyle="default"
  onChange={setValue}
/>
```

### Segmented Control

```tsx
<SwiftUI.Picker
  label="View Mode"
  selection={viewMode}
  options={['list', 'grid', 'map']}
  pickerStyle="segmented"
  onChange={setViewMode}
/>
```

### Menu

```tsx
<SwiftUI.Picker
  label="Category"
  selection={category}
  options={categories}
  pickerStyle="menu"
  onChange={setCategory}
/>
```

### Wheel

```tsx
<SwiftUI.Picker
  label="Size"
  selection={size}
  options={sizes}
  pickerStyle="wheel"
  style={{ height: 216 }}
  onChange={setSize}
/>
```

### Inline

```tsx
<SwiftUI.Picker
  label="Priority"
  selection={priority}
  options={['Low', 'Medium', 'High']}
  pickerStyle="inline"
  onChange={setPriority}
/>
```

## Option Formats

### Simple Strings

```tsx
<SwiftUI.Picker
  label="Color"
  selection={color}
  options={['Red', 'Green', 'Blue']}
  onChange={setColor}
/>
```

### Labeled Options

For different display labels and values:

```tsx
<SwiftUI.Picker
  label="Country"
  selection={countryCode}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
  onChange={setCountryCode}
/>
```

## Numeric Picker with Config

For numeric ranges, use the `config` prop:

```tsx
<SwiftUI.Picker
  label="Age"
  selection={age}
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

<SwiftUI.Section header="Appearance">
  <SwiftUI.Picker
    label="Theme"
    selection={theme}
    options={[
      { value: 'system', label: 'System' },
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ]}
    pickerStyle="segmented"
    onChange={setTheme}
  />
</SwiftUI.Section>
```

### Category Filter

```tsx
const [category, setCategory] = useState('all');

<SwiftUI.Picker
  label="Category"
  selection={category}
  options={[
    { value: 'all', label: 'All Items' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' },
  ]}
  pickerStyle="menu"
  onChange={setCategory}
/>
```

### Dynamic Options

```tsx
const [options, setOptions] = useState(['Option 1', 'Option 2']);
const [selected, setSelected] = useState('Option 1');

<SwiftUI.Section>
  <SwiftUI.Picker
    label="Choose"
    selection={selected}
    options={options}
    onChange={setSelected}
  />
  <SwiftUI.Button
    title="Add Option"
    onPress={() => setOptions([...options, `Option ${options.length + 1}`])}
  />
</SwiftUI.Section>
```
