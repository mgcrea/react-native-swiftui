---
title: Event Handling
description: Handling events in SwiftUI components
---

This guide covers event handling patterns for SwiftUI components.

## Event Types

SwiftUI components support various event callbacks:

| Event | Components | Description |
|-------|------------|-------------|
| `onChange` | TextField, Toggle, Picker, DatePicker, Slider, Stepper, NumberField | Value changed |
| `onPress` | Button | Button pressed |
| `onFocus` | TextField, NumberField, Picker, DatePicker, Slider, Stepper | Component focused |
| `onBlur` | TextField, NumberField, Picker, DatePicker, Slider, Stepper | Component blurred |
| `onDismiss` | Sheet, SheetPicker | Modal dismissed |
| `onPrimaryAction` | Sheet | Primary button pressed |
| `onSecondaryAction` | Sheet | Secondary button pressed |

## Basic Patterns

### onChange

The most common event for controlled inputs:

```tsx
const [value, setValue] = useState('');

<SwiftUI.TextField
  label="Name"
  text={value}
  onChange={setValue}
/>

// Or with transformation
<SwiftUI.TextField
  label="Name"
  text={value}
  onChange={(newValue) => {
    setValue(newValue.trim());
  }}
/>
```

### onPress

For button interactions:

```tsx
<SwiftUI.Button
  title="Submit"
  onPress={() => {
    console.log('Button pressed');
    handleSubmit();
  }}
/>
```

### onFocus / onBlur

For tracking focus state:

```tsx
const [isFocused, setIsFocused] = useState(false);

<SwiftUI.TextField
  label="Email"
  text={email}
  onChange={setEmail}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
```

## Common Use Cases

### Validation on Blur

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = () => {
  if (!email) {
    setError('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('Invalid email format');
  } else {
    setError('');
  }
};

<SwiftUI.Section footer={error}>
  <SwiftUI.TextField
    label="Email"
    keyboardType="emailAddress"
    text={email}
    onChange={(value) => {
      setEmail(value);
      if (error) setError(''); // Clear error on change
    }}
    onBlur={validateEmail}
  />
</SwiftUI.Section>
```

### Debounced Search

```tsx
import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

function SearchForm() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <SwiftUI.TextField
      label="Search"
      placeholder="Search..."
      text={query}
      onChange={setQuery}
    />
  );
}
```

### Conditional Fields

```tsx
const [hasAddress, setHasAddress] = useState(false);
const [address, setAddress] = useState('');

<SwiftUI.Toggle
  label="Add shipping address"
  isOn={hasAddress}
  onChange={(value) => {
    setHasAddress(value);
    if (!value) setAddress(''); // Clear when disabled
  }}
/>

{hasAddress && (
  <SwiftUI.TextField
    label="Address"
    text={address}
    onChange={setAddress}
  />
)}
```

### Sheet Events

```tsx
const [showSheet, setShowSheet] = useState(false);

<SwiftUI.Sheet
  isPresented={showSheet}
  title="Confirm Action"
  message="Are you sure?"
  primaryButtonTitle="Yes"
  secondaryButtonTitle="No"
  onDismiss={() => {
    setShowSheet(false);
    console.log('Sheet dismissed');
  }}
  onPrimaryAction={() => {
    handleConfirm();
    setShowSheet(false);
  }}
  onSecondaryAction={() => {
    setShowSheet(false);
  }}
/>
```

### Form Submission

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    await submitForm(formData);
    Alert.alert('Success', 'Form submitted!');
  } catch (error) {
    Alert.alert('Error', 'Submission failed');
  } finally {
    setIsSubmitting(false);
  }
};

<SwiftUI.Button
  title={isSubmitting ? 'Submitting...' : 'Submit'}
  disabled={isSubmitting}
  onPress={handleSubmit}
/>
```

## Type-Safe Event Handlers

### Generic Change Handlers

```tsx
type FormData = {
  name: string;
  age: number;
  active: boolean;
};

const [form, setForm] = useState<FormData>({
  name: '',
  age: 0,
  active: false,
});

const handleChange = <K extends keyof FormData>(
  field: K,
  value: FormData[K]
) => {
  setForm(prev => ({ ...prev, [field]: value }));
};

<SwiftUI.TextField
  label="Name"
  text={form.name}
  onChange={(value) => handleChange('name', value)}
/>

<SwiftUI.Stepper
  label={`Age: ${form.age}`}
  value={form.age}
  onChange={(value) => handleChange('age', value)}
/>

<SwiftUI.Toggle
  label="Active"
  isOn={form.active}
  onChange={(value) => handleChange('active', value)}
/>
```

### Event Handler Factory

```tsx
const createChangeHandler = <T,>(setter: (value: T) => void) => {
  return (value: T) => {
    console.log('Value changed:', value);
    setter(value);
  };
};

const [name, setName] = useState('');

<SwiftUI.TextField
  label="Name"
  text={name}
  onChange={createChangeHandler(setName)}
/>
```

## Raw Events

The root `SwiftUI` component provides access to raw native events:

```tsx
<SwiftUI
  style={{ flex: 1 }}
  onEvent={(event) => {
    const { type, id, value } = event.nativeEvent;
    console.log(`Event: ${type} from ${id}`, value);
  }}
>
  {/* Components */}
</SwiftUI>
```

Event structure:

```tsx
type NativeSwiftUIEvent = {
  type: 'change' | 'press' | 'focus' | 'blur' | 'dismiss' | 'primaryAction' | 'secondaryAction';
  id: string;
  value?: unknown;
};
```

## Tips

1. **Use controlled components** - Always pass current value and onChange together
2. **Validate on blur** - Better UX than validating on every keystroke
3. **Debounce expensive operations** - Don't search on every character
4. **Clear related state** - When toggling features off, clear associated data
5. **Handle loading states** - Disable forms during async operations
6. **Type your handlers** - Use TypeScript for type-safe event handling
