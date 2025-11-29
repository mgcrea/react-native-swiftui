---
title: MultiPicker
description: Multi-column picker component
---

The `MultiPicker` component provides a multi-column wheel picker, useful for selecting related values like duration or measurements.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [selections, setSelections] = useState(['1', '30']);

<SwiftUI.MultiPicker
  label="Duration"
  components={[
    { label: 'Hours', options: ['0', '1', '2', '3', '4'] },
    { label: 'Minutes', options: ['0', '15', '30', '45'] },
  ]}
  selections={selections}
  onChange={setSelections}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `components` | `NativeMultiPickerComponent[]` | **Required** | Array of picker columns |
| `selections` | `string[]` | - | Array of selected values (one per component) |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disable picker |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onChange` | `(value: string[]) => void` | - | Called when any selection changes |
| `onFocus` | `() => void` | - | Called when picker is focused |
| `onBlur` | `() => void` | - | Called when picker loses focus |

## Component Configuration

Each component in the `components` array can have:

| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Column label |
| `options` | `(string \| { value: string; label: string })[]` | Column options |
| `config` | `NativeMultiPickerComponentConfig` | Numeric range config |

### Using Options Array

```tsx
const components = [
  {
    label: 'Size',
    options: ['Small', 'Medium', 'Large'],
  },
  {
    label: 'Color',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
    ],
  },
];
```

### Using Numeric Config

```tsx
const components = [
  {
    label: 'Hours',
    config: { min: 0, max: 23, suffix: 'h' },
  },
  {
    label: 'Minutes',
    config: { min: 0, max: 59, step: 5, suffix: 'm' },
  },
];
```

## Examples

### Time Duration Picker

```tsx
const [duration, setDuration] = useState(['1', '30']);

<SwiftUI.Form>
  <SwiftUI.Section header="Timer">
    <SwiftUI.Text text={`Duration: ${duration[0]}h ${duration[1]}m`} />
    <SwiftUI.MultiPicker
      label="Set Duration"
      components={[
        {
          label: 'Hours',
          config: { min: 0, max: 12, suffix: ' hr' },
        },
        {
          label: 'Minutes',
          config: { min: 0, max: 55, step: 5, suffix: ' min' },
        },
      ]}
      selections={duration}
      onChange={setDuration}
      style={{ height: 216 }}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Height Picker (Feet & Inches)

```tsx
const [height, setHeight] = useState(['5', '10']);

<SwiftUI.Section header="Height">
  <SwiftUI.MultiPicker
    label="Your Height"
    components={[
      {
        label: 'Feet',
        config: { min: 4, max: 7, suffix: "'" },
      },
      {
        label: 'Inches',
        config: { min: 0, max: 11, suffix: '"' },
      },
    ]}
    selections={height}
    onChange={setHeight}
    style={{ height: 216 }}
  />
</SwiftUI.Section>
```

### Date Components

```tsx
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const [date, setDate] = useState(['January', '1', '2024']);

<SwiftUI.MultiPicker
  label="Select Date"
  components={[
    { label: 'Month', options: months },
    { label: 'Day', config: { min: 1, max: 31 } },
    { label: 'Year', config: { min: 2020, max: 2030 } },
  ]}
  selections={date}
  onChange={setDate}
  style={{ height: 216 }}
/>
```

### Size Selection

```tsx
const [size, setSize] = useState(['M', 'Regular']);

<SwiftUI.MultiPicker
  label="Size"
  components={[
    {
      label: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      label: 'Length',
      options: ['Short', 'Regular', 'Long'],
    },
  ]}
  selections={size}
  onChange={setSize}
/>
```

### Handling Selection Changes

```tsx
const [selections, setSelections] = useState(['0', '0']);

const handleChange = (values: string[]) => {
  console.log('Hours:', values[0]);
  console.log('Minutes:', values[1]);
  setSelections(values);
};

<SwiftUI.MultiPicker
  components={components}
  selections={selections}
  onChange={handleChange}
/>
```
