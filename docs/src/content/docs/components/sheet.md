---
title: Sheet
description: Modal sheet presentation component
---

The `Sheet` component presents content in a modal sheet that slides up from the bottom of the screen.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [isPresented, setIsPresented] = useState(false);

<SwiftUI.Button title="Show Sheet" onPress={() => setIsPresented(true)} />

<SwiftUI.Sheet
  isPresented={isPresented}
  title="My Sheet"
  onDismiss={() => setIsPresented(false)}
>
  <SwiftUI.Text text="Sheet content here" />
</SwiftUI.Sheet>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isPresented` | `boolean` | `false` | Whether sheet is visible |
| `detents` | `NativeSheetDetent[]` | - | Sheet height options |
| `title` | `string` | - | Sheet title |
| `message` | `string` | - | Sheet message/subtitle |
| `primaryButtonTitle` | `string` | - | Primary action button title |
| `secondaryButtonTitle` | `string` | - | Secondary action button title |
| `onDismiss` | `() => void` | - | Called when sheet is dismissed |
| `onPrimaryAction` | `() => void` | - | Called when primary button is pressed |
| `onSecondaryAction` | `() => void` | - | Called when secondary button is pressed |
| `children` | `ReactNode` | - | Sheet content |

## Detents

Control the sheet height with detents:

```tsx
<SwiftUI.Sheet
  isPresented={isPresented}
  detents={['medium', 'large']}
  onDismiss={() => setIsPresented(false)}
>
  {/* Content */}
</SwiftUI.Sheet>
```

Available detent values:
- `"medium"` - Half screen height
- `"large"` - Full screen height
- `"fraction:0.25"` - Custom fraction (e.g., 25% of screen)
- `"height:300"` - Fixed height in points

## Examples

### Confirmation Sheet

```tsx
const [showConfirm, setShowConfirm] = useState(false);

<SwiftUI.Sheet
  isPresented={showConfirm}
  title="Confirm Delete"
  message="Are you sure you want to delete this item? This action cannot be undone."
  primaryButtonTitle="Delete"
  secondaryButtonTitle="Cancel"
  detents={['medium']}
  onDismiss={() => setShowConfirm(false)}
  onPrimaryAction={() => {
    deleteItem();
    setShowConfirm(false);
  }}
  onSecondaryAction={() => setShowConfirm(false)}
/>
```

### Sheet with Form Content

```tsx
const [isEditing, setIsEditing] = useState(false);
const [editName, setEditName] = useState('');

<SwiftUI.Sheet
  isPresented={isEditing}
  title="Edit Profile"
  detents={['medium', 'large']}
  onDismiss={() => setIsEditing(false)}
>
  <SwiftUI.Form>
    <SwiftUI.Section>
      <SwiftUI.TextField
        label="Name"
        text={editName}
        onChange={setEditName}
      />
    </SwiftUI.Section>
    <SwiftUI.Section>
      <SwiftUI.Button
        title="Save"
        buttonStyle="borderedProminent"
        onPress={() => {
          saveName(editName);
          setIsEditing(false);
        }}
      />
    </SwiftUI.Section>
  </SwiftUI.Form>
</SwiftUI.Sheet>
```

### Multi-Detent Sheet

```tsx
<SwiftUI.Sheet
  isPresented={showDetails}
  detents={['fraction:0.25', 'medium', 'large']}
  onDismiss={() => setShowDetails(false)}
>
  <SwiftUI.VStack>
    <SwiftUI.Text text="Pull to expand" style={{ font: 'headline' }} />
    <SwiftUI.Text text="This sheet can be resized to different heights" />
    {/* More content that becomes visible when expanded */}
  </SwiftUI.VStack>
</SwiftUI.Sheet>
```

### Fixed Height Sheet

```tsx
<SwiftUI.Sheet
  isPresented={showPicker}
  detents={['height:300']}
  title="Select Option"
  onDismiss={() => setShowPicker(false)}
>
  <SwiftUI.Picker
    selection={selected}
    options={options}
    pickerStyle="wheel"
    onChange={setSelected}
    style={{ height: 216 }}
  />
</SwiftUI.Sheet>
```

### Action Sheet Pattern

```tsx
const [showActions, setShowActions] = useState(false);

<SwiftUI.Sheet
  isPresented={showActions}
  detents={['medium']}
  onDismiss={() => setShowActions(false)}
>
  <SwiftUI.VStack spacing={8}>
    <SwiftUI.Button
      title="Share"
      buttonStyle="bordered"
      onPress={() => {
        handleShare();
        setShowActions(false);
      }}
    />
    <SwiftUI.Button
      title="Copy Link"
      buttonStyle="bordered"
      onPress={() => {
        handleCopyLink();
        setShowActions(false);
      }}
    />
    <SwiftUI.Button
      title="Report"
      buttonStyle="bordered"
      style={{ color: 'red' }}
      onPress={() => {
        handleReport();
        setShowActions(false);
      }}
    />
    <SwiftUI.Button
      title="Cancel"
      buttonStyle="borderedProminent"
      onPress={() => setShowActions(false)}
    />
  </SwiftUI.VStack>
</SwiftUI.Sheet>
```
