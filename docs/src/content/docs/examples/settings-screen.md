---
title: Settings Screen
description: iOS-style settings screen with toggles and pickers
---

This example demonstrates a typical iOS settings screen pattern.

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert, Linking } from 'react-native';

export function SettingsScreenExample() {
  // Notifications
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [badgeEnabled, setBadgeEnabled] = useState(true);

  // Appearance
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [reduceMotion, setReduceMotion] = useState(false);

  // Privacy
  const [analytics, setAnalytics] = useState(false);
  const [crashReports, setCrashReports] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  // Account
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Signed out') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          {/* Notifications Section */}
          <SwiftUI.Section
            header="Notifications"
            footer="Manage how you receive notifications from the app."
          >
            <SwiftUI.Toggle
              label="Push Notifications"
              isOn={pushEnabled}
              onChange={setPushEnabled}
            />
            <SwiftUI.Toggle
              label="Email Notifications"
              isOn={emailEnabled}
              onChange={setEmailEnabled}
            />
            <SwiftUI.Toggle
              label="Sound"
              isOn={soundEnabled}
              disabled={!pushEnabled}
              onChange={setSoundEnabled}
            />
            <SwiftUI.Toggle
              label="Badge"
              isOn={badgeEnabled}
              disabled={!pushEnabled}
              onChange={setBadgeEnabled}
            />
          </SwiftUI.Section>

          {/* Appearance Section */}
          <SwiftUI.Section header="Appearance">
            <SwiftUI.Picker
              label="Theme"
              selection={theme}
              options={[
                { value: 'system', label: 'System' },
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
              ]}
              pickerStyle="menu"
              onChange={setTheme}
            />
            <SwiftUI.Picker
              label="Text Size"
              selection={fontSize}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
                { value: 'xlarge', label: 'Extra Large' },
              ]}
              pickerStyle="menu"
              onChange={setFontSize}
            />
            <SwiftUI.Toggle
              label="Reduce Motion"
              isOn={reduceMotion}
              onChange={setReduceMotion}
            />
          </SwiftUI.Section>

          {/* Privacy Section */}
          <SwiftUI.Section
            header="Privacy"
            footer="Your privacy is important to us. Learn more in our Privacy Policy."
          >
            <SwiftUI.Toggle
              label="Analytics"
              isOn={analytics}
              onChange={setAnalytics}
            />
            <SwiftUI.Toggle
              label="Crash Reports"
              isOn={crashReports}
              onChange={setCrashReports}
            />
            <SwiftUI.Toggle
              label="Personalization"
              isOn={personalization}
              onChange={setPersonalization}
            />
          </SwiftUI.Section>

          {/* About Section */}
          <SwiftUI.Section header="About">
            <SwiftUI.HStack>
              <SwiftUI.Text text="Version" />
              <SwiftUI.Spacer />
              <SwiftUI.Text text="1.0.0" style={{ color: '#666' }} />
            </SwiftUI.HStack>
            <SwiftUI.Button
              title="Privacy Policy"
              buttonStyle="plain"
              onPress={() => Linking.openURL('https://example.com/privacy')}
            />
            <SwiftUI.Button
              title="Terms of Service"
              buttonStyle="plain"
              onPress={() => Linking.openURL('https://example.com/terms')}
            />
            <SwiftUI.Button
              title="Rate on App Store"
              buttonStyle="plain"
              onPress={() => Linking.openURL('https://apps.apple.com')}
            />
          </SwiftUI.Section>

          {/* Account Actions */}
          <SwiftUI.Section>
            <SwiftUI.Button
              title="Sign Out"
              onPress={handleSignOut}
            />
          </SwiftUI.Section>

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Delete Account"
              style={{ color: 'red' }}
              onPress={handleDeleteAccount}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Key Features

- **Multiple toggle groups** for different settings categories
- **Conditional disable** (sound/badge disabled when push is off)
- **Picker menus** for selection options
- **Info rows** with version number
- **External links** to policies
- **Destructive actions** with confirmation dialogs
- **Section footers** for explanatory text
