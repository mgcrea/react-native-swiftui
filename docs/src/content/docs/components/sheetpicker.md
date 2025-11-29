---
title: SheetPicker
description: Searchable picker presented in a sheet
---

The `SheetPicker` component presents a searchable list of options in a modal sheet, ideal for long lists.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [selectedCountry, setSelectedCountry] = useState('us');

<SwiftUI.SheetPicker
  label="Country"
  selectedValue={selectedCountry}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    // ... more options
  ]}
  title="Select Country"
  searchPlaceholder="Search countries"
  onChange={setSelectedCountry}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Field label |
| `selectedValue` | `string` | - | Currently selected value |
| `options` | `readonly NativeSheetPickerOptionInput[]` | - | Array of options |
| `title` | `string` | - | Sheet title |
| `searchPlaceholder` | `string` | - | Search field placeholder |
| `placeholder` | `string` | - | Placeholder when no selection |
| `autoDismiss` | `boolean` | `true` | Auto-dismiss after selection |
| `disabled` | `boolean` | `false` | Disable picker |
| `isPresented` | `boolean` | - | Controlled presentation state |
| `onChange` | `(value: string) => void` | - | Called when selection changes |
| `onDismiss` | `() => void` | - | Called when sheet is dismissed |
| `children` | `ReactNode` | - | Custom trigger content |

## Option Format

Options can be strings or objects:

```tsx
// Simple strings
options={['Apple', 'Banana', 'Orange']}

// Labeled options
options={[
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
]}
```

## Examples

### Country Selector

```tsx
const [country, setCountry] = useState('');

<SwiftUI.Form>
  <SwiftUI.Section header="Location">
    <SwiftUI.SheetPicker
      label="Country"
      selectedValue={country}
      options={countries}
      title="Select Country"
      searchPlaceholder="Search countries..."
      placeholder="Choose a country"
      onChange={setCountry}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Product Category

```tsx
const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing & Apparel' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'books', label: 'Books & Media' },
  { value: 'toys', label: 'Toys & Games' },
];

const [category, setCategory] = useState('');

<SwiftUI.SheetPicker
  label="Category"
  selectedValue={category}
  options={categories}
  title="Select Category"
  searchPlaceholder="Search categories"
  onChange={setCategory}
/>
```

### Without Auto-Dismiss

Keep sheet open after selection:

```tsx
const [isOpen, setIsOpen] = useState(false);
const [selected, setSelected] = useState('');

<SwiftUI.SheetPicker
  label="Select Multiple"
  selectedValue={selected}
  options={options}
  isPresented={isOpen}
  autoDismiss={false}
  onChange={setSelected}
  onDismiss={() => setIsOpen(false)}
/>
```

### Large List

Ideal for long lists with search:

```tsx
const fruits = [
  'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry',
  'Blueberry', 'Cherry', 'Coconut', 'Cranberry', 'Date',
  'Dragon Fruit', 'Fig', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Kiwi', 'Lemon', 'Lime', 'Lychee',
  'Mango', 'Melon', 'Nectarine', 'Orange', 'Papaya',
  'Passion Fruit', 'Peach', 'Pear', 'Pineapple', 'Plum',
  'Pomegranate', 'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon',
];

const [fruit, setFruit] = useState('');

<SwiftUI.SheetPicker
  label="Favorite Fruit"
  selectedValue={fruit}
  options={fruits}
  title="Choose a Fruit"
  searchPlaceholder="Search fruits..."
  placeholder="Select your favorite"
  onChange={setFruit}
/>
```

### Disabled State

```tsx
<SwiftUI.SheetPicker
  label="Region"
  selectedValue="us"
  options={regions}
  disabled
  onChange={() => {}}
/>
```

### In Form Context

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Shipping Address">
    <SwiftUI.TextField
      label="Street"
      text={street}
      onChange={setStreet}
    />
    <SwiftUI.TextField
      label="City"
      text={city}
      onChange={setCity}
    />
    <SwiftUI.SheetPicker
      label="State"
      selectedValue={state}
      options={usStates}
      title="Select State"
      searchPlaceholder="Search states"
      onChange={setState}
    />
    <SwiftUI.TextField
      label="ZIP Code"
      text={zip}
      keyboardType="numberPad"
      onChange={setZip}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```
