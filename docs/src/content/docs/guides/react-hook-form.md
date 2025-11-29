---
title: React Hook Form Integration
description: Using React Native SwiftUI with react-hook-form
---

This guide shows how to integrate React Native SwiftUI with [react-hook-form](https://react-hook-form.com/) for form validation and management.

## Installation

```bash
npm install react-hook-form
```

## Basic Setup

Use `Controller` from react-hook-form to wrap SwiftUI components:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useForm, Controller } from 'react-hook-form';
import { View, Alert } from 'react-native';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = (data: FormData) => {
    Alert.alert('Success', JSON.stringify(data, null, 2));
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Info">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SwiftUI.TextField
                  label="First Name"
                  placeholder="John"
                  text={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SwiftUI.TextField
                  label="Last Name"
                  placeholder="Doe"
                  text={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SwiftUI.TextField
                  label="Email"
                  placeholder="john@example.com"
                  keyboardType="emailAddress"
                  text={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Submit"
              buttonStyle="borderedProminent"
              onPress={handleSubmit(onSubmit)}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Error Handling

Display validation errors in section footers:

```tsx
<SwiftUI.Section
  header="Email"
  footer={errors.email?.message}
>
  <Controller
    name="email"
    control={control}
    rules={{
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format',
      },
    }}
    render={({ field: { onChange, onBlur, value } }) => (
      <SwiftUI.TextField
        placeholder="you@example.com"
        keyboardType="emailAddress"
        text={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )}
  />
</SwiftUI.Section>
```

## Different Input Types

### Toggle

```tsx
<Controller
  name="notifications"
  control={control}
  render={({ field: { onChange, value } }) => (
    <SwiftUI.Toggle
      label="Enable Notifications"
      isOn={value}
      onChange={onChange}
    />
  )}
/>
```

### Picker

```tsx
<Controller
  name="country"
  control={control}
  rules={{ required: 'Country is required' }}
  render={({ field: { onChange, value } }) => (
    <SwiftUI.Picker
      label="Country"
      selection={value}
      options={['USA', 'Canada', 'UK', 'Germany']}
      onChange={onChange}
    />
  )}
/>
```

### DatePicker

```tsx
<Controller
  name="birthDate"
  control={control}
  rules={{ required: 'Birth date is required' }}
  render={({ field: { onChange, value } }) => (
    <SwiftUI.DatePicker
      label="Birth Date"
      selection={value}
      displayedComponents="date"
      onChange={onChange}
    />
  )}
/>
```

### Slider

```tsx
<Controller
  name="rating"
  control={control}
  render={({ field: { onChange, value } }) => (
    <SwiftUI.Slider
      label={`Rating: ${value}`}
      value={value}
      minimum={0}
      maximum={10}
      step={1}
      onChange={onChange}
    />
  )}
/>
```

## Complete Example

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useForm, Controller } from 'react-hook-form';
import { View, Alert } from 'react-native';

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  gender: string;
  newsletter: boolean;
};

export function ProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      birthDate: new Date(),
      gender: 'prefer_not_to_say',
      newsletter: false,
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      await saveProfile(data);
      Alert.alert('Success', 'Profile saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const onError = (errors: any) => {
    const messages = Object.values(errors)
      .map((e: any) => e.message)
      .join('\n');
    Alert.alert('Validation Error', messages);
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form disabled={isSubmitting}>
          <SwiftUI.Section
            header="Personal Information"
            footer={errors.firstName?.message || errors.lastName?.message}
          >
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SwiftUI.TextField
                  label="First Name"
                  text={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SwiftUI.TextField
                  label="Last Name"
                  text={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SwiftUI.DatePicker
                  label="Birth Date"
                  selection={value}
                  displayedComponents="date"
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SwiftUI.Picker
                  label="Gender"
                  selection={value}
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
                  ]}
                  onChange={onChange}
                />
              )}
            />
          </SwiftUI.Section>

          <SwiftUI.Section
            header="Contact"
            footer={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SwiftUI.TextField
                  label="Email"
                  keyboardType="emailAddress"
                  text={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Preferences">
            <Controller
              name="newsletter"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SwiftUI.Toggle
                  label="Subscribe to Newsletter"
                  isOn={value}
                  onChange={onChange}
                />
              )}
            />
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title={isSubmitting ? 'Saving...' : 'Save Profile'}
              buttonStyle="borderedProminent"
              onPress={handleSubmit(onSubmit, onError)}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Tips

1. **Use `Controller`** for all SwiftUI components - don't use `register` directly
2. **Handle `onBlur`** for fields that need blur validation
3. **Display errors** in section footers for clean UI
4. **Disable form** during submission using the `disabled` prop
5. **Use TypeScript** for type-safe form values
