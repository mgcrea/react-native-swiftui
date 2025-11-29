---
title: User Profile
description: Profile editing form with image, date picker, and validation
---

This example demonstrates a user profile editing form.

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert } from 'react-native';

type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export function UserProfileExample() {
  // Profile data
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [birthDate, setBirthDate] = useState(new Date('1990-01-15'));
  const [gender, setGender] = useState<Gender>('prefer_not_to_say');
  const [website, setWebsite] = useState('');

  // Privacy settings
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (website && !website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    if (bio.length > 280) {
      newErrors.bio = 'Bio must be 280 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form disabled={isSubmitting}>
          {/* Profile Picture Section */}
          <SwiftUI.Section>
            <SwiftUI.HStack>
              <SwiftUI.Spacer />
              <SwiftUI.VStack spacing={8}>
                <SwiftUI.Image
                  name="system:person.circle.fill"
                  style={{ width: 100, height: 100, color: '#007AFF' }}
                />
                <SwiftUI.Button
                  title="Change Photo"
                  buttonStyle="plain"
                  onPress={() => Alert.alert('Photo', 'Photo picker would open here')}
                />
              </SwiftUI.VStack>
              <SwiftUI.Spacer />
            </SwiftUI.HStack>
          </SwiftUI.Section>

          {/* Basic Info */}
          <SwiftUI.Section
            header="Basic Information"
            footer={errors.firstName || errors.lastName || ''}
          >
            <SwiftUI.TextField
              label="First Name"
              placeholder="Enter first name"
              text={firstName}
              onChange={(value) => {
                setFirstName(value);
                if (errors.firstName) setErrors({ ...errors, firstName: '' });
              }}
            />
            <SwiftUI.TextField
              label="Last Name"
              placeholder="Enter last name"
              text={lastName}
              onChange={(value) => {
                setLastName(value);
                if (errors.lastName) setErrors({ ...errors, lastName: '' });
              }}
            />
            <SwiftUI.DatePicker
              label="Birthday"
              selection={birthDate}
              displayedComponents="date"
              datePickerStyle="compact"
              onChange={setBirthDate}
            />
            <SwiftUI.Picker
              label="Gender"
              selection={gender}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer_not_to_say', label: 'Prefer not to say' },
              ]}
              pickerStyle="menu"
              onChange={(value) => setGender(value as Gender)}
            />
          </SwiftUI.Section>

          {/* Contact Info */}
          <SwiftUI.Section
            header="Contact Information"
            footer={errors.email || errors.website || ''}
          >
            <SwiftUI.TextField
              label="Email"
              placeholder="you@example.com"
              keyboardType="emailAddress"
              autocapitalizationType="none"
              text={email}
              onChange={(value) => {
                setEmail(value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
            />
            <SwiftUI.TextField
              label="Phone"
              placeholder="(555) 123-4567"
              keyboardType="numberPad"
              text={phone}
              onChange={setPhone}
            />
            <SwiftUI.TextField
              label="Website"
              placeholder="https://yoursite.com"
              keyboardType="url"
              autocapitalizationType="none"
              text={website}
              onChange={(value) => {
                setWebsite(value);
                if (errors.website) setErrors({ ...errors, website: '' });
              }}
            />
          </SwiftUI.Section>

          {/* Bio */}
          <SwiftUI.Section
            header="About"
            footer={errors.bio || `${bio.length}/280 characters`}
          >
            <SwiftUI.TextField
              placeholder="Tell us about yourself..."
              multiline
              maxLength={280}
              text={bio}
              onChange={(value) => {
                setBio(value);
                if (errors.bio) setErrors({ ...errors, bio: '' });
              }}
              style={{ minHeight: 80 }}
            />
          </SwiftUI.Section>

          {/* Privacy Settings */}
          <SwiftUI.Section
            header="Privacy"
            footer="Choose what information is visible to other users."
          >
            <SwiftUI.Toggle
              label="Show Email"
              isOn={showEmail}
              onChange={setShowEmail}
            />
            <SwiftUI.Toggle
              label="Show Phone"
              isOn={showPhone}
              onChange={setShowPhone}
            />
            <SwiftUI.Toggle
              label="Show Birthday"
              isOn={showBirthday}
              onChange={setShowBirthday}
            />
          </SwiftUI.Section>

          {/* Save Button */}
          <SwiftUI.Section>
            <SwiftUI.Button
              title={isSubmitting ? 'Saving...' : 'Save Profile'}
              buttonStyle="borderedProminent"
              onPress={handleSave}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Key Features

- **Profile image** with change button
- **Date picker** for birthday
- **Gender picker** with menu style
- **Contact information** with appropriate keyboard types
- **Character-limited bio** with counter
- **Privacy toggles** for visibility settings
- **Field validation** with error display in footers
- **Loading state** during save
