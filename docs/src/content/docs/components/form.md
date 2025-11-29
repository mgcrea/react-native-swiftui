---
title: Form
description: Container for form elements with native iOS styling
---

The `Form` component provides a container for form elements with native iOS styling, including grouped appearance and automatic layout.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Personal Info">
    <SwiftUI.TextField label="Name" text={name} onChange={setName} />
    <SwiftUI.TextField label="Email" text={email} onChange={setEmail} />
  </SwiftUI.Section>
</SwiftUI.Form>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties |
| `disabled` | `boolean` | `false` | Disable all form controls |
| `scrollDisabled` | `boolean` | `false` | Disable form scrolling |
| `children` | `ReactNode` | - | Form content (typically Sections) |

## Features

- Automatic grouped styling for iOS
- Built-in scrolling
- Proper keyboard avoidance
- Section support with headers and footers

## Examples

### Basic Form

```tsx
const [name, setName] = useState('');
const [email, setEmail] = useState('');

<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.Form>
    <SwiftUI.Section header="Contact">
      <SwiftUI.TextField
        label="Name"
        placeholder="Enter your name"
        text={name}
        onChange={setName}
      />
      <SwiftUI.TextField
        label="Email"
        placeholder="Enter your email"
        keyboardType="emailAddress"
        text={email}
        onChange={setEmail}
      />
    </SwiftUI.Section>
  </SwiftUI.Form>
</SwiftUI>
```

### Multi-Section Form

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Account">
    <SwiftUI.TextField label="Username" text={username} onChange={setUsername} />
    <SwiftUI.TextField label="Password" text={password} onChange={setPassword} secure />
  </SwiftUI.Section>

  <SwiftUI.Section header="Preferences">
    <SwiftUI.Toggle label="Dark Mode" isOn={darkMode} onChange={setDarkMode} />
    <SwiftUI.Toggle label="Notifications" isOn={notifications} onChange={setNotifications} />
  </SwiftUI.Section>

  <SwiftUI.Section>
    <SwiftUI.Button title="Save" onPress={handleSave} />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Disabled Form

Disable all form controls at once:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

<SwiftUI.Form disabled={isSubmitting}>
  <SwiftUI.Section header="Profile">
    <SwiftUI.TextField label="Name" text={name} onChange={setName} />
    <SwiftUI.TextField label="Bio" text={bio} onChange={setBio} multiline />
  </SwiftUI.Section>
  <SwiftUI.Section>
    <SwiftUI.Button
      title={isSubmitting ? 'Saving...' : 'Save'}
      onPress={handleSubmit}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Non-Scrolling Form

For forms embedded in other scrollable content:

```tsx
<ScrollView>
  <SwiftUI style={{ minHeight: 400 }}>
    <SwiftUI.Form scrollDisabled>
      <SwiftUI.Section header="Quick Settings">
        <SwiftUI.Toggle label="WiFi" isOn={wifi} onChange={setWifi} />
        <SwiftUI.Toggle label="Bluetooth" isOn={bluetooth} onChange={setBluetooth} />
      </SwiftUI.Section>
    </SwiftUI.Form>
  </SwiftUI>
</ScrollView>
```

### Complete Settings Form

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="General">
    <SwiftUI.Picker
      label="Language"
      selection={language}
      options={['English', 'Spanish', 'French']}
      onChange={setLanguage}
    />
    <SwiftUI.Picker
      label="Region"
      selection={region}
      options={['US', 'EU', 'Asia']}
      onChange={setRegion}
    />
  </SwiftUI.Section>

  <SwiftUI.Section header="Notifications" footer="Manage how you receive alerts">
    <SwiftUI.Toggle label="Push Notifications" isOn={push} onChange={setPush} />
    <SwiftUI.Toggle label="Email Notifications" isOn={emailNotif} onChange={setEmailNotif} />
    <SwiftUI.Toggle label="Sound" isOn={sound} onChange={setSound} />
  </SwiftUI.Section>

  <SwiftUI.Section header="Privacy">
    <SwiftUI.Toggle label="Share Analytics" isOn={analytics} onChange={setAnalytics} />
    <SwiftUI.Button title="Privacy Policy" onPress={openPrivacyPolicy} />
    <SwiftUI.Button title="Terms of Service" onPress={openTerms} />
  </SwiftUI.Section>

  <SwiftUI.Section>
    <SwiftUI.Button
      title="Sign Out"
      style={{ color: 'red' }}
      onPress={handleSignOut}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```
