---
title: DatePicker
description: Date and time selection component
---

The `DatePicker` component provides native SwiftUI date and time selection.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [date, setDate] = useState(new Date());

<SwiftUI.DatePicker
  label="Select Date"
  selection={date}
  onChange={setDate}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selection` | `Date` | - | Currently selected date |
| `label` | `string` | - | Label text |
| `labelStyle` | `StyleProp<NativeTextStyle>` | - | Style for the label text |
| `datePickerStyle` | `NativeDatePickerStyle` | `"automatic"` | Visual style |
| `displayedComponents` | `NativeDatePickerComponents[] \| NativeDatePickerComponentsAliases` | - | Which components to display |
| `disabled` | `boolean` | `false` | Disable picker |
| `onChange` | `(value: Date) => void` | - | Called when date changes |
| `onFocus` | `() => void` | - | Called when picker is focused |
| `onBlur` | `() => void` | - | Called when picker loses focus |

## Date Picker Styles

```tsx
<SwiftUI.DatePicker
  label="Automatic"
  selection={date}
  datePickerStyle="automatic"
  onChange={setDate}
/>
```

Available styles:
- `automatic` - System chooses appropriate style
- `compact` - Compact inline display
- `field` - Text field style
- `graphical` - Calendar view
- `stepperField` - Field with stepper
- `wheel` - Wheel picker style

## Displayed Components

Control which parts of the date/time are shown:

```tsx
// Date only
<SwiftUI.DatePicker
  label="Birth Date"
  selection={date}
  displayedComponents="date"
  onChange={setDate}
/>

// Time only
<SwiftUI.DatePicker
  label="Alarm Time"
  selection={date}
  displayedComponents="time"
  onChange={setDate}
/>

// Both date and time
<SwiftUI.DatePicker
  label="Event"
  selection={date}
  displayedComponents="datetime"
  onChange={setDate}
/>
```

Component aliases:
- `"date"` - Date components
- `"time"` - Time components (hourAndMinute)
- `"datetime"` - Both date and time

Or use array syntax for fine control:
- `["date"]` - Date only
- `["hourAndMinute"]` - Hours and minutes
- `["hourMinuteAndSecond"]` - Hours, minutes, and seconds
- `["date", "hourAndMinute"]` - Date with time

## Examples

### Birth Date Picker

```tsx
const [birthDate, setBirthDate] = useState(new Date('1990-01-01'));

<SwiftUI.Form>
  <SwiftUI.Section header="Personal Info">
    <SwiftUI.DatePicker
      label="Birth Date"
      selection={birthDate}
      displayedComponents="date"
      datePickerStyle="automatic"
      onChange={setBirthDate}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Appointment Scheduler

```tsx
const [appointmentDate, setAppointmentDate] = useState(new Date());

<SwiftUI.Section header="Schedule Appointment">
  <SwiftUI.DatePicker
    label="Date & Time"
    selection={appointmentDate}
    displayedComponents="datetime"
    datePickerStyle="compact"
    onChange={setAppointmentDate}
  />
</SwiftUI.Section>
```

### Graphical Calendar

```tsx
const [selectedDate, setSelectedDate] = useState(new Date());

<SwiftUI.DatePicker
  label="Select a date"
  selection={selectedDate}
  displayedComponents="date"
  datePickerStyle="graphical"
  onChange={setSelectedDate}
/>
```

### Time Picker

```tsx
const [alarmTime, setAlarmTime] = useState(new Date());

<SwiftUI.Section header="Alarm">
  <SwiftUI.DatePicker
    label="Wake Up"
    selection={alarmTime}
    displayedComponents="time"
    datePickerStyle="wheel"
    onChange={setAlarmTime}
  />
</SwiftUI.Section>
```

### Formatting Display

The date picker handles Date objects. Format for display separately:

```tsx
const [date, setDate] = useState(new Date());

<SwiftUI.Section header="Event">
  <SwiftUI.DatePicker
    label="When"
    selection={date}
    displayedComponents="datetime"
    onChange={setDate}
  />
  <SwiftUI.Text
    text={`Selected: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`}
    style={{ color: '#666' }}
  />
</SwiftUI.Section>
```
