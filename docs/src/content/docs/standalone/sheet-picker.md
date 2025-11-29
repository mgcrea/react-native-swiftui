---
title: SwiftUISheetPicker
description: Standalone searchable picker in a sheet
---

The `SwiftUISheetPicker` presents a searchable list of options in a modal sheet, ideal for large option lists.

## Import

```tsx
import { SwiftUISheetPicker, type SwiftUISheetPickerHandle } from '@mgcrea/react-native-swiftui';
```

## Usage

### Declarative

```tsx
const [selected, setSelected] = useState('apple');
const [isOpen, setIsOpen] = useState(false);

<Button title="Select Fruit" onPress={() => setIsOpen(true)} />

<SwiftUISheetPicker
  isPresented={isOpen}
  selectedValue={selected}
  options={fruits}
  title="Choose a Fruit"
  searchPlaceholder="Search fruits..."
  onSelect={(value) => setSelected(value)}
  onDismiss={() => setIsOpen(false)}
/>
```

### Imperative

```tsx
const pickerRef = useRef<SwiftUISheetPickerHandle>(null);

<Button title="Select" onPress={() => pickerRef.current?.present()} />

<SwiftUISheetPicker
  ref={pickerRef}
  options={options}
  onSelect={handleSelect}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `readonly SheetPickerOption[]` | **Required** | Array of options |
| `isPresented` | `boolean` | - | Whether picker is visible |
| `selectedValue` | `string` | - | Currently selected value |
| `label` | `string` | - | Field label |
| `title` | `string` | - | Sheet title |
| `searchPlaceholder` | `string` | - | Search input placeholder |
| `placeholder` | `string` | - | Value placeholder |
| `autoDismiss` | `boolean` | `true` | Auto-dismiss after selection |
| `onSelect` | `(value: string) => void` | - | Selection callback |
| `onDismiss` | `() => void` | - | Dismiss callback |

## Ref Handle

```tsx
interface SwiftUISheetPickerHandle {
  present(): void;
  dismiss(): void;
}
```

## Option Format

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
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  // ... many more countries
];

const [country, setCountry] = useState('us');
const [showPicker, setShowPicker] = useState(false);

<TouchableOpacity onPress={() => setShowPicker(true)} style={styles.selector}>
  <Text>{countries.find(c => c.value === country)?.label}</Text>
  <SFSymbol name="chevron.down" size={12} color="#666" />
</TouchableOpacity>

<SwiftUISheetPicker
  isPresented={showPicker}
  selectedValue={country}
  options={countries}
  title="Select Country"
  searchPlaceholder="Search countries..."
  onSelect={setCountry}
  onDismiss={() => setShowPicker(false)}
/>
```

### Imperative Control

```tsx
const pickerRef = useRef<SwiftUISheetPickerHandle>(null);
const [selected, setSelected] = useState('');

const openPicker = () => {
  pickerRef.current?.present();
};

const closePicker = () => {
  pickerRef.current?.dismiss();
};

<View>
  <Button title="Select Item" onPress={openPicker} />
  <Text>Selected: {selected || 'None'}</Text>

  <SwiftUISheetPicker
    ref={pickerRef}
    selectedValue={selected}
    options={items}
    title="Choose Item"
    searchPlaceholder="Search..."
    autoDismiss={true}
    onSelect={(value) => {
      setSelected(value);
      console.log('Selected:', value);
    }}
    onDismiss={() => console.log('Picker dismissed')}
  />
</View>
```

### Without Auto-Dismiss

Keep the picker open after selection for multiple selections:

```tsx
const [selected, setSelected] = useState('');
const [isOpen, setIsOpen] = useState(false);

<SwiftUISheetPicker
  isPresented={isOpen}
  selectedValue={selected}
  options={options}
  autoDismiss={false}
  onSelect={(value) => {
    setSelected(value);
    // Picker stays open
  }}
  onDismiss={() => setIsOpen(false)}
/>
```

### Form Field Pattern

```tsx
const [state, setState] = useState('');
const [showStatePicker, setShowStatePicker] = useState(false);

<View style={styles.formField}>
  <Text style={styles.label}>State</Text>
  <TouchableOpacity
    style={styles.input}
    onPress={() => setShowStatePicker(true)}
  >
    <Text style={state ? styles.value : styles.placeholder}>
      {state ? usStates.find(s => s.value === state)?.label : 'Select state'}
    </Text>
    <SFSymbol name="chevron.right" size={14} color="#999" />
  </TouchableOpacity>
</View>

<SwiftUISheetPicker
  isPresented={showStatePicker}
  selectedValue={state}
  options={usStates}
  title="Select State"
  searchPlaceholder="Search states..."
  onSelect={setState}
  onDismiss={() => setShowStatePicker(false)}
/>
```

### Large Dataset

The searchable picker handles large lists efficiently:

```tsx
// 1000+ items handled smoothly
const allCities = generateCityList(); // Large array

<SwiftUISheetPicker
  isPresented={showCities}
  selectedValue={city}
  options={allCities}
  title="Select City"
  searchPlaceholder="Search cities..."
  onSelect={setCity}
  onDismiss={() => setShowCities(false)}
/>
```

### With Custom Button Trigger

```tsx
const [currency, setCurrency] = useState('USD');
const [showPicker, setShowPicker] = useState(false);

<TouchableOpacity
  style={styles.currencyButton}
  onPress={() => setShowPicker(true)}
>
  <Text style={styles.currencyCode}>{currency}</Text>
  <SFSymbol name="chevron.up.chevron.down" size={10} color="#007AFF" />
</TouchableOpacity>

<SwiftUISheetPicker
  isPresented={showPicker}
  selectedValue={currency}
  options={currencies}
  title="Select Currency"
  searchPlaceholder="Search..."
  onSelect={setCurrency}
  onDismiss={() => setShowPicker(false)}
/>
```
