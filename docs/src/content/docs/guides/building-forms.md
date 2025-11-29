---
title: Building Forms
description: Learn how to build forms with SwiftUI components
---

This guide covers patterns and best practices for building forms with React Native SwiftUI.

## Basic Form Structure

Every form starts with the `Form` component containing `Section` elements:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View } from 'react-native';

function BasicForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Contact Information">
            <SwiftUI.TextField
              label="Name"
              placeholder="Enter your name"
              text={name}
              onChange={setName}
            />
            <SwiftUI.TextField
              label="Email"
              placeholder="you@example.com"
              keyboardType="emailAddress"
              text={email}
              onChange={setEmail}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Form Sections

Use sections to organize related fields:

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Personal" footer="Required fields">
    <SwiftUI.TextField label="First Name" text={firstName} onChange={setFirstName} />
    <SwiftUI.TextField label="Last Name" text={lastName} onChange={setLastName} />
  </SwiftUI.Section>

  <SwiftUI.Section header="Account">
    <SwiftUI.TextField label="Username" text={username} onChange={setUsername} />
    <SwiftUI.TextField label="Password" text={password} onChange={setPassword} secure />
  </SwiftUI.Section>

  <SwiftUI.Section>
    <SwiftUI.Button title="Create Account" onPress={handleSubmit} />
  </SwiftUI.Section>
</SwiftUI.Form>
```

## Input Types

### Text Fields

```tsx
// Basic text
<SwiftUI.TextField
  label="Name"
  text={name}
  onChange={setName}
/>

// Email
<SwiftUI.TextField
  label="Email"
  keyboardType="emailAddress"
  autocapitalizationType="none"
  textContentType="emailAddress"
  text={email}
  onChange={setEmail}
/>

// Password
<SwiftUI.TextField
  label="Password"
  secure
  textContentType="password"
  text={password}
  onChange={setPassword}
/>

// Multiline
<SwiftUI.TextField
  label="Bio"
  multiline
  text={bio}
  onChange={setBio}
/>
```

### Selection Controls

```tsx
// Toggle
<SwiftUI.Toggle
  label="Notifications"
  isOn={notifications}
  onChange={setNotifications}
/>

// Picker
<SwiftUI.Picker
  label="Country"
  selection={country}
  options={['USA', 'Canada', 'UK']}
  onChange={setCountry}
/>

// Date Picker
<SwiftUI.DatePicker
  label="Birthday"
  selection={birthday}
  displayedComponents="date"
  onChange={setBirthday}
/>
```

### Numeric Controls

```tsx
// Stepper
<SwiftUI.Stepper
  label={`Quantity: ${quantity}`}
  value={quantity}
  minimum={1}
  maximum={10}
  onChange={setQuantity}
/>

// Slider
<SwiftUI.Slider
  label={`Volume: ${volume}%`}
  value={volume}
  minimum={0}
  maximum={100}
  onChange={setVolume}
/>

// Number Field
<SwiftUI.NumberField
  label="Price"
  value={price}
  formatter="currency"
  onChange={setPrice}
/>
```

## State Management

### Simple State

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  notifications: true,
});

const updateField = <K extends keyof typeof formData>(
  field: K,
  value: typeof formData[K]
) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

<SwiftUI.TextField
  label="Name"
  text={formData.name}
  onChange={(value) => updateField('name', value)}
/>
```

### With Reducer

```tsx
type FormAction =
  | { type: 'SET_FIELD'; field: string; value: unknown }
  | { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(formReducer, initialState);

<SwiftUI.TextField
  label="Name"
  text={state.name}
  onChange={(value) => dispatch({ type: 'SET_FIELD', field: 'name', value })}
/>
```

## Validation

### Basic Validation

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  setEmailError(isValid ? '' : 'Invalid email format');
  return isValid;
};

<SwiftUI.Section header="Contact" footer={emailError}>
  <SwiftUI.TextField
    label="Email"
    text={email}
    onChange={(value) => {
      setEmail(value);
      validateEmail(value);
    }}
    onBlur={() => validateEmail(email)}
  />
</SwiftUI.Section>
```

### Submit Validation

```tsx
const validate = () => {
  const errors: string[] = [];

  if (!name.trim()) errors.push('Name is required');
  if (!email.includes('@')) errors.push('Valid email is required');
  if (password.length < 8) errors.push('Password must be 8+ characters');

  return errors;
};

const handleSubmit = () => {
  const errors = validate();
  if (errors.length > 0) {
    Alert.alert('Validation Error', errors.join('\n'));
    return;
  }
  // Submit form
};
```

## Disabling Forms

Disable entire form during submission:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    await submitForm(formData);
  } finally {
    setIsSubmitting(false);
  }
};

<SwiftUI.Form disabled={isSubmitting}>
  <SwiftUI.Section header="Profile">
    <SwiftUI.TextField label="Name" text={name} onChange={setName} />
  </SwiftUI.Section>
  <SwiftUI.Section>
    <SwiftUI.Button
      title={isSubmitting ? 'Saving...' : 'Save'}
      onPress={handleSubmit}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

## Complete Example

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert } from 'react-native';

export function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [newsletter, setNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // API call here
      Alert.alert('Success', 'Account created!');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form disabled={isSubmitting}>
          <SwiftUI.Section header="Personal Information">
            <SwiftUI.TextField
              label="First Name"
              text={firstName}
              onChange={setFirstName}
            />
            <SwiftUI.TextField
              label="Last Name"
              text={lastName}
              onChange={setLastName}
            />
            <SwiftUI.DatePicker
              label="Birth Date"
              selection={birthDate}
              displayedComponents="date"
              onChange={setBirthDate}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Account">
            <SwiftUI.TextField
              label="Email"
              keyboardType="emailAddress"
              text={email}
              onChange={setEmail}
            />
            <SwiftUI.TextField
              label="Password"
              secure
              text={password}
              onChange={setPassword}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Preferences">
            <SwiftUI.Toggle
              label="Subscribe to Newsletter"
              isOn={newsletter}
              onChange={setNewsletter}
            />
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title={isSubmitting ? 'Creating...' : 'Create Account'}
              buttonStyle="borderedProminent"
              onPress={handleSubmit}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```
