---
title: Section
description: Grouped content container with header and footer
---

The `Section` component groups related content within a Form, providing visual separation and optional headers/footers.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Account Settings">
    <SwiftUI.TextField label="Username" text={username} onChange={setUsername} />
    <SwiftUI.TextField label="Email" text={email} onChange={setEmail} />
  </SwiftUI.Section>
</SwiftUI.Form>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `string` | - | Section header text |
| `footer` | `string` | - | Section footer text |
| `isCollapsed` | `boolean` | - | Whether section is collapsed |
| `style` | `StyleProp<NativeViewStyle>` | - | Style properties |
| `children` | `ReactNode` | - | Section content |

## Examples

### Basic Section

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Profile">
    <SwiftUI.TextField label="Name" text={name} onChange={setName} />
    <SwiftUI.TextField label="Bio" text={bio} onChange={setBio} />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### With Header and Footer

```tsx
<SwiftUI.Form>
  <SwiftUI.Section
    header="Password"
    footer="Your password must be at least 8 characters and include a number."
  >
    <SwiftUI.TextField
      label="Current Password"
      text={currentPassword}
      onChange={setCurrentPassword}
      secure
    />
    <SwiftUI.TextField
      label="New Password"
      text={newPassword}
      onChange={setNewPassword}
      secure
    />
    <SwiftUI.TextField
      label="Confirm Password"
      text={confirmPassword}
      onChange={setConfirmPassword}
      secure
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Multiple Sections

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Personal Information">
    <SwiftUI.TextField label="First Name" text={firstName} onChange={setFirstName} />
    <SwiftUI.TextField label="Last Name" text={lastName} onChange={setLastName} />
    <SwiftUI.DatePicker
      label="Birth Date"
      selection={birthDate}
      displayedComponents="date"
      onChange={setBirthDate}
    />
  </SwiftUI.Section>

  <SwiftUI.Section header="Contact">
    <SwiftUI.TextField
      label="Email"
      text={email}
      keyboardType="emailAddress"
      onChange={setEmail}
    />
    <SwiftUI.TextField
      label="Phone"
      text={phone}
      keyboardType="numberPad"
      onChange={setPhone}
    />
  </SwiftUI.Section>

  <SwiftUI.Section header="Preferences">
    <SwiftUI.Toggle
      label="Newsletter"
      isOn={newsletter}
      onChange={setNewsletter}
    />
    <SwiftUI.Picker
      label="Language"
      selection={language}
      options={['English', 'Spanish', 'French']}
      onChange={setLanguage}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Section Without Header

Use sections without headers for action buttons:

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Account">
    <SwiftUI.TextField label="Email" text={email} onChange={setEmail} />
  </SwiftUI.Section>

  <SwiftUI.Section>
    <SwiftUI.Button
      title="Save Changes"
      buttonStyle="borderedProminent"
      onPress={handleSave}
    />
  </SwiftUI.Section>

  <SwiftUI.Section>
    <SwiftUI.Button
      title="Delete Account"
      style={{ color: 'red' }}
      onPress={handleDelete}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Collapsible Section

```tsx
const [isCollapsed, setIsCollapsed] = useState(false);

<SwiftUI.Section
  header="Advanced Options"
  isCollapsed={isCollapsed}
>
  <SwiftUI.Toggle label="Debug Mode" isOn={debug} onChange={setDebug} />
  <SwiftUI.Toggle label="Verbose Logging" isOn={verbose} onChange={setVerbose} />
  <SwiftUI.Picker
    label="Log Level"
    selection={logLevel}
    options={['Error', 'Warning', 'Info', 'Debug']}
    onChange={setLogLevel}
  />
</SwiftUI.Section>
```

### Footer with Instructions

```tsx
<SwiftUI.Section
  header="Two-Factor Authentication"
  footer="Enter the 6-digit code from your authenticator app. The code refreshes every 30 seconds."
>
  <SwiftUI.TextField
    label="Verification Code"
    placeholder="000000"
    keyboardType="numberPad"
    maxLength={6}
    text={code}
    onChange={setCode}
  />
</SwiftUI.Section>
```
