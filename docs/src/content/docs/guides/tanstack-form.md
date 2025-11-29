---
title: TanStack Form Integration
description: Using React Native SwiftUI with TanStack Form
---

This guide shows how to integrate React Native SwiftUI with [TanStack Form](https://tanstack.com/form) for form management and validation.

## Installation

```bash
npm install @tanstack/react-form
```

## Basic Setup

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useForm } from '@tanstack/react-form';
import { View, Alert } from 'react-native';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export function MyForm() {
  const form = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      Alert.alert('Submitted', JSON.stringify(value, null, 2));
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Info">
            <form.Field name="firstName">
              {(field) => (
                <SwiftUI.TextField
                  label="First Name"
                  text={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>

            <form.Field name="lastName">
              {(field) => (
                <SwiftUI.TextField
                  label="Last Name"
                  text={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <SwiftUI.TextField
                  label="Email"
                  keyboardType="emailAddress"
                  text={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Submit"
              onPress={() => form.handleSubmit()}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Validation

TanStack Form supports inline validation:

```tsx
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) =>
      !value
        ? 'Email is required'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? 'Invalid email format'
        : undefined,
  }}
>
  {(field) => (
    <SwiftUI.TextField
      label="Email"
      keyboardType="emailAddress"
      text={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
    />
  )}
</form.Field>
```

### Display Errors

```tsx
<SwiftUI.Section
  header="Email"
  footer={field.state.meta.errors.join(', ')}
>
  {/* field content */}
</SwiftUI.Section>
```

## Different Input Types

### Toggle

```tsx
<form.Field name="notifications">
  {(field) => (
    <SwiftUI.Toggle
      label="Enable Notifications"
      isOn={field.state.value}
      onChange={field.handleChange}
    />
  )}
</form.Field>
```

### Picker

```tsx
<form.Field name="country">
  {(field) => (
    <SwiftUI.Picker
      label="Country"
      selection={field.state.value}
      options={['USA', 'Canada', 'UK']}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
    />
  )}
</form.Field>
```

### DatePicker

```tsx
<form.Field name="birthDate">
  {(field) => (
    <SwiftUI.DatePicker
      label="Birth Date"
      selection={field.state.value}
      displayedComponents="date"
      onChange={field.handleChange}
      onBlur={field.handleBlur}
    />
  )}
</form.Field>
```

### Stepper

```tsx
<form.Field name="quantity">
  {(field) => (
    <SwiftUI.Stepper
      label={`Quantity: ${field.state.value}`}
      value={field.state.value}
      minimum={1}
      maximum={10}
      onChange={field.handleChange}
    />
  )}
</form.Field>
```

## Helper Function for Options

Convert enum objects to picker options:

```tsx
function toLabelledOptions<T extends Record<string, string>>(options: T) {
  return Object.entries(options).map(([value, label]) => ({
    value,
    label,
  }));
}

const GENDER_OPTIONS = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
  prefer_not_to_say: 'Prefer not to say',
};

<form.Field name="gender">
  {(field) => (
    <SwiftUI.Picker
      label="Gender"
      selection={field.state.value}
      options={toLabelledOptions(GENDER_OPTIONS)}
      onChange={field.handleChange}
    />
  )}
</form.Field>
```

## Complete Example

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useForm } from '@tanstack/react-form';
import { View, Alert } from 'react-native';

type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  birthDate: Date;
  newsletter: boolean;
};

const GENDER_OPTIONS = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
  prefer_not_to_say: 'Prefer not to say',
} as const;

export function ProfileForm() {
  const form = useForm<ProfileForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'prefer_not_to_say',
      birthDate: new Date(),
      newsletter: false,
    },
    onSubmit: async ({ value }) => {
      try {
        await saveProfile(value);
        Alert.alert('Success', 'Profile saved!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save profile');
      }
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'First name is required'
                    : value.length < 2
                    ? 'Must be at least 2 characters'
                    : undefined,
              }}
            >
              {(field) => (
                <SwiftUI.TextField
                  label="First Name"
                  text={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>

            <form.Field
              name="lastName"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Last name is required' : undefined,
              }}
            >
              {(field) => (
                <SwiftUI.TextField
                  label="Last Name"
                  text={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>

            <form.Field name="birthDate">
              {(field) => (
                <SwiftUI.DatePicker
                  label="Birth Date"
                  selection={field.state.value}
                  displayedComponents="date"
                  datePickerStyle="automatic"
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>

            <form.Field name="gender">
              {(field) => (
                <SwiftUI.Picker
                  label="Gender"
                  selection={field.state.value}
                  options={Object.entries(GENDER_OPTIONS).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                  pickerStyle="menu"
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>
          </SwiftUI.Section>

          <SwiftUI.Section header="Contact">
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'Email is required'
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? 'Invalid email format'
                    : undefined,
              }}
            >
              {(field) => (
                <SwiftUI.TextField
                  label="Email"
                  keyboardType="emailAddress"
                  autocapitalizationType="none"
                  text={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
              )}
            </form.Field>
          </SwiftUI.Section>

          <SwiftUI.Section header="Preferences">
            <form.Field name="newsletter">
              {(field) => (
                <SwiftUI.Toggle
                  label="Subscribe to Newsletter"
                  isOn={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Save Profile"
              buttonStyle="borderedProminent"
              onPress={() => form.handleSubmit()}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Tips

1. **Use `form.Field`** render prop pattern for each input
2. **Pass `handleChange`** and `handleBlur`** to components
3. **Access `field.state.value`** for current value
4. **Use `field.state.meta.errors`** for validation errors
5. **Call `form.handleSubmit()`** on button press
6. **Define validators** inline or as separate functions
