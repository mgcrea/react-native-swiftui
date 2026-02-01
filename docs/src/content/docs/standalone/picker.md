---
title: SwiftUIPicker
description: Standalone native picker component
---

The `SwiftUIPicker` is a standalone native picker that can be used outside the SwiftUI tree with support for multiple picker styles.

## Import

```tsx
import { SwiftUIPicker } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [selected, setSelected] = useState('apple');

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

<SwiftUIPicker
  label="Fruit"
  value={selected}
  options={options}
  pickerStyle="menu"
  onChange={(value) => setSelected(value)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Currently selected value (preferred) |
| `selection` | `string` | - | Currently selected value (deprecated, use `value`) |
| `options` | `{ value: string; label?: string; icon?: string }[]` | - | Array of options |
| `pickerStyle` | `"default" \| "inline" \| "menu" \| "segmented" \| "wheel"` | `"default"` | Visual style |
| `label` | `string` | - | Picker label |
| `labelColor` | `string` | - | Label text color |
| `onChange` | `(value: string, event: NativeOnChangeEvent) => void` | - | Selection change handler |
| `onFocus` | `() => void` | - | Focus handler |
| `onBlur` | `() => void` | - | Blur handler |
| `style` | `StyleProp<ViewStyle>` | - | Container style |

## Option Format

Options must be objects with `value` and `label` properties:

```tsx
const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];
```

The `label` property is optional and defaults to `value` if not provided. For segmented pickers, you can also include an SF Symbol icon:

```tsx
const options = [
  { value: 'list', label: 'List', icon: 'list.bullet' },
  { value: 'grid', label: 'Grid', icon: 'square.grid.2x2' },
];
```

## Picker Styles

Each picker style has a default height:

| Style | Default Height |
|-------|---------------|
| `default` | 44 |
| `inline` | 200 |
| `menu` | 44 |
| `segmented` | 32 |
| `wheel` | 216 |

### Menu Style

```tsx
const options = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
];

<SwiftUIPicker
  label="Category"
  value={category}
  options={options}
  pickerStyle="menu"
  onChange={(value) => setCategory(value)}
/>
```

### Segmented Style

```tsx
const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

<SwiftUIPicker
  value={tab}
  options={options}
  pickerStyle="segmented"
  onChange={(value) => setTab(value)}
/>
```

### Segmented with SF Symbols

```tsx
const options = [
  { value: 'list', label: 'List', icon: 'list.bullet' },
  { value: 'grid', label: 'Grid', icon: 'square.grid.2x2' },
  { value: 'map', label: 'Map', icon: 'map' },
];

<SwiftUIPicker
  value={viewMode}
  options={options}
  pickerStyle="segmented"
  onChange={(value) => setViewMode(value)}
/>
```

### Wheel Style

```tsx
const options = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
];

<SwiftUIPicker
  value={size}
  options={options}
  pickerStyle="wheel"
  onChange={(value) => setSize(value)}
  style={{ height: 216 }}
/>
```

### Inline Style

```tsx
const options = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

<SwiftUIPicker
  value={priority}
  options={options}
  pickerStyle="inline"
  onChange={(value) => setPriority(value)}
  style={{ height: 200 }}
/>
```

## Styling

### Custom Tint Color

```tsx
<SwiftUIPicker
  value={selected}
  options={options}
  pickerStyle="segmented"
  onChange={setSelected}
  style={{ tint: '#FF9500' }}
/>
```

### Label Color

```tsx
<SwiftUIPicker
  label="Choose Option"
  labelColor="#007AFF"
  value={selected}
  options={options}
  onChange={setSelected}
/>
```

## Examples

### Filter Tabs

```tsx
const [filter, setFilter] = useState('all');

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

<View style={styles.filterContainer}>
  <SwiftUIPicker
    value={filter}
    options={filterOptions}
    pickerStyle="segmented"
    onChange={(value) => setFilter(value)}
    style={{ marginHorizontal: 16 }}
  />
</View>
```

### Settings Row

```tsx
const themeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

<View style={styles.settingRow}>
  <Text style={styles.settingLabel}>Theme</Text>
  <SwiftUIPicker
    value={theme}
    options={themeOptions}
    pickerStyle="menu"
    onChange={(value) => setTheme(value)}
  />
</View>
```

### Dynamic Style Switcher

```tsx
const styleOptions = [
  { value: 'default', label: 'Default' },
  { value: 'inline', label: 'Inline' },
  { value: 'menu', label: 'Menu' },
  { value: 'segmented', label: 'Segmented' },
  { value: 'wheel', label: 'Wheel' },
];

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const [pickerStyle, setPickerStyle] = useState<PickerStyle>('menu');
const [selectedFruit, setSelectedFruit] = useState('apple');

<View style={styles.container}>
  <Text style={styles.label}>Picker Style</Text>
  <SwiftUIPicker
    value={pickerStyle}
    options={styleOptions}
    pickerStyle="segmented"
    onChange={(value) => setPickerStyle(value as PickerStyle)}
  />

  <Text style={styles.label}>Select Fruit</Text>
  <SwiftUIPicker
    value={selectedFruit}
    options={fruitOptions}
    pickerStyle={pickerStyle}
    onChange={(value) => setSelectedFruit(value)}
    style={pickerStyle === 'wheel' ? { height: 216 } : undefined}
  />
</View>
```

### Country Selector

```tsx
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
];

<SwiftUIPicker
  label="Country"
  value={country}
  options={countryOptions}
  pickerStyle="menu"
  onChange={(value) => setCountry(value)}
/>
```

### In a Form Layout

```tsx
const sizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
];

<View style={styles.form}>
  <View style={styles.row}>
    <Text style={styles.label}>Size</Text>
    <SwiftUIPicker
      value={size}
      options={sizeOptions}
      pickerStyle="menu"
      onChange={setSize}
    />
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Color</Text>
    <SwiftUIPicker
      value={color}
      options={colorOptions}
      pickerStyle="menu"
      onChange={setColor}
    />
  </View>
</View>
```
