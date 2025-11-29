---
title: Basic Form
description: A complete basic form example
---

This example demonstrates a basic contact form with common input types.

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert } from 'react-native';

export function BasicFormExample() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Valid email is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert('Success', 'Your message has been sent!');

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubscribe(false);
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
          <SwiftUI.Section header="Contact Information">
            <SwiftUI.TextField
              label="First Name"
              placeholder="John"
              text={firstName}
              onChange={setFirstName}
            />
            <SwiftUI.TextField
              label="Last Name"
              placeholder="Doe"
              text={lastName}
              onChange={setLastName}
            />
            <SwiftUI.TextField
              label="Email"
              placeholder="john@example.com"
              keyboardType="emailAddress"
              autocapitalizationType="none"
              textContentType="emailAddress"
              text={email}
              onChange={setEmail}
            />
            <SwiftUI.TextField
              label="Phone"
              placeholder="(555) 123-4567"
              keyboardType="numberPad"
              textContentType="telephoneNumber"
              text={phone}
              onChange={setPhone}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Message">
            <SwiftUI.TextField
              placeholder="How can we help you?"
              multiline
              text={message}
              onChange={setMessage}
              style={{ minHeight: 100 }}
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Preferences">
            <SwiftUI.Toggle
              label="Subscribe to newsletter"
              isOn={subscribe}
              onChange={setSubscribe}
            />
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title={isSubmitting ? 'Sending...' : 'Send Message'}
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

## Key Features

- **Text fields** with various keyboard types
- **Multiline** text input for longer messages
- **Toggle** for preferences
- **Form validation** before submission
- **Loading state** with disabled form
- **Form reset** after successful submission
