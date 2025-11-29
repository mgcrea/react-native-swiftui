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

<SwiftUIPicker
  label="Fruit"
  selection={selected}
  options={['Apple', 'Banana', 'Orange']}
  pickerStyle="menu"
  onChange={(value) => setSelected(value)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selection` | `string` | - | Currently selected value |
| `options` | `(string \| { value: string; label: string })[]` | - | Array of options |
| `pickerStyle` | `"default" \| "inline" \| "menu" \| "segmented" \| "wheel"` | `"default"` | Visual style |
| `label` | `string` | - | Picker label |
| `labelColor` | `string` | - | Label text color |
| `onChange` | `(value: string, event: NativeOnChangeEvent) => void` | - | Selection change handler |
| `onFocus` | `() => void` | - | Focus handler |
| `onBlur` | `() => void` | - | Blur handler |
| `style` | `StyleProp<ViewStyle>` | - | Container style |

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
<SwiftUIPicker
  label="Category"
  selection={category}
  options={categories}
  pickerStyle="menu"
  onChange={(value) => setCategory(value)}
/>
```

### Segmented Style

```tsx
<SwiftUIPicker
  selection={tab}
  options={['Day', 'Week', 'Month']}
  pickerStyle="segmented"
  onChange={(value) => setTab(value)}
/>
```

### Wheel Style

```tsx
<SwiftUIPicker
  selection={size}
  options={['XS', 'S', 'M', 'L', 'XL']}
  pickerStyle="wheel"
  onChange={(value) => setSize(value)}
  style={{ height: 216 }}
/>
```

### Inline Style

```tsx
<SwiftUIPicker
  selection={priority}
  options={['Low', 'Medium', 'High']}
  pickerStyle="inline"
  onChange={(value) => setPriority(value)}
  style={{ height: 200 }}
/>
```

## Styling

### Custom Tint Color

```tsx
<SwiftUIPicker
  selection={selected}
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
  selection={selected}
  options={options}
  onChange={setSelected}
/>
```

## Examples

### Filter Tabs

```tsx
const [filter, setFilter] = useState('all');

<View style={styles.filterContainer}>
  <SwiftUIPicker
    selection={filter}
    options={[
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Done' },
    ]}
    pickerStyle="segmented"
    onChange={(value) => setFilter(value)}
    style={{ marginHorizontal: 16 }}
  />
</View>
```

### Settings Row

```tsx
<View style={styles.settingRow}>
  <Text style={styles.settingLabel}>Theme</Text>
  <SwiftUIPicker
    selection={theme}
    options={['System', 'Light', 'Dark']}
    pickerStyle="menu"
    onChange={(value) => setTheme(value)}
  />
</View>
```

### Dynamic Style Switcher

```tsx
const [pickerStyle, setPickerStyle] = useState<PickerStyle>('menu');
const [selectedFruit, setSelectedFruit] = useState('Apple');

<View style={styles.container}>
  <Text style={styles.label}>Picker Style</Text>
  <SwiftUIPicker
    selection={pickerStyle}
    options={['default', 'inline', 'menu', 'segmented', 'wheel']}
    pickerStyle="segmented"
    onChange={(value) => setPickerStyle(value as PickerStyle)}
  />

  <Text style={styles.label}>Select Fruit</Text>
  <SwiftUIPicker
    selection={selectedFruit}
    options={['Apple', 'Banana', 'Orange', 'Grape', 'Mango']}
    pickerStyle={pickerStyle}
    onChange={(value) => setSelectedFruit(value)}
    style={pickerStyle === 'wheel' ? { height: 216 } : undefined}
  />
</View>
```

### With Labeled Options

```tsx
<SwiftUIPicker
  label="Country"
  selection={country}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ]}
  pickerStyle="menu"
  onChange={(value) => setCountry(value)}
/>
```

### In a Form Layout

```tsx
<View style={styles.form}>
  <View style={styles.row}>
    <Text style={styles.label}>Size</Text>
    <SwiftUIPicker
      selection={size}
      options={['Small', 'Medium', 'Large']}
      pickerStyle="menu"
      onChange={setSize}
    />
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Color</Text>
    <SwiftUIPicker
      selection={color}
      options={['Red', 'Blue', 'Green']}
      pickerStyle="menu"
      onChange={setColor}
    />
  </View>
</View>
```
