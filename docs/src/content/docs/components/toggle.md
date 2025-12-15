---
title: Toggle
description: Boolean switch component
---

The `Toggle` component provides a native SwiftUI switch for boolean values.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [isEnabled, setIsEnabled] = useState(false);

<SwiftUI.Toggle
  label="Enable Feature"
  isOn={isEnabled}
  onChange={setIsEnabled}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOn` | `boolean` | **Required** | Current toggle state |
| `label` | `string` | - | Label text displayed next to toggle |
| `labelStyle` | `StyleProp<NativeTextStyle>` | - | Style for the label text |
| `disabled` | `boolean` | `false` | Disable toggle interaction |
| `onChange` | `(value: boolean) => void` | - | Called when toggle state changes |

## Examples

### Basic Toggle

```tsx
const [notifications, setNotifications] = useState(true);

<SwiftUI.Toggle
  label="Push Notifications"
  isOn={notifications}
  onChange={setNotifications}
/>
```

### Settings Form

```tsx
const [settings, setSettings] = useState({
  notifications: true,
  sounds: true,
  haptics: false,
  analytics: false,
});

const updateSetting = (key: keyof typeof settings, value: boolean) => {
  setSettings(prev => ({ ...prev, [key]: value }));
};

<SwiftUI.Form>
  <SwiftUI.Section header="Notifications">
    <SwiftUI.Toggle
      label="Push Notifications"
      isOn={settings.notifications}
      onChange={(v) => updateSetting('notifications', v)}
    />
    <SwiftUI.Toggle
      label="Sound"
      isOn={settings.sounds}
      onChange={(v) => updateSetting('sounds', v)}
    />
    <SwiftUI.Toggle
      label="Haptic Feedback"
      isOn={settings.haptics}
      onChange={(v) => updateSetting('haptics', v)}
    />
  </SwiftUI.Section>

  <SwiftUI.Section header="Privacy">
    <SwiftUI.Toggle
      label="Share Analytics"
      isOn={settings.analytics}
      onChange={(v) => updateSetting('analytics', v)}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Disabled Toggle

```tsx
<SwiftUI.Toggle
  label="Premium Feature"
  isOn={false}
  disabled
  onChange={() => {}}
/>
```

### Conditional Logic

```tsx
const [parentEnabled, setParentEnabled] = useState(false);
const [childEnabled, setChildEnabled] = useState(false);

<SwiftUI.Section header="Features">
  <SwiftUI.Toggle
    label="Enable Advanced Mode"
    isOn={parentEnabled}
    onChange={setParentEnabled}
  />
  <SwiftUI.Toggle
    label="Sub-feature"
    isOn={childEnabled}
    disabled={!parentEnabled}
    onChange={setChildEnabled}
  />
</SwiftUI.Section>
```
