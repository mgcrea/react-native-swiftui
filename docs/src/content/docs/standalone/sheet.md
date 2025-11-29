---
title: SwiftUISheet
description: Standalone modal sheet with imperative API
---

The `SwiftUISheet` is a standalone modal sheet component that supports both declarative and imperative control.

## Import

```tsx
import { SwiftUISheet, type SwiftUISheetHandle } from '@mgcrea/react-native-swiftui';
```

## Usage

### Declarative

```tsx
const [isPresented, setIsPresented] = useState(false);

<Button title="Show Sheet" onPress={() => setIsPresented(true)} />

<SwiftUISheet
  isPresented={isPresented}
  title="My Sheet"
  message="This is a sheet"
  onDismiss={() => setIsPresented(false)}
/>
```

### Imperative

```tsx
const sheetRef = useRef<SwiftUISheetHandle>(null);

<Button title="Show Sheet" onPress={() => sheetRef.current?.present()} />

<SwiftUISheet
  ref={sheetRef}
  title="My Sheet"
  onDismiss={() => console.log('dismissed')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isPresented` | `boolean` | `false` | Whether sheet is visible |
| `title` | `string` | - | Sheet title |
| `message` | `string` | - | Sheet message/subtitle |
| `primaryButtonTitle` | `string` | - | Primary action button title |
| `secondaryButtonTitle` | `string` | - | Secondary action button title |
| `onDismiss` | `() => void` | - | Called when sheet is dismissed |
| `onPrimaryAction` | `() => void` | - | Primary button callback |
| `onSecondaryAction` | `() => void` | - | Secondary button callback |

## Ref Handle

```tsx
interface SwiftUISheetHandle {
  present(): void;
  dismiss(): void;
}
```

## Examples

### Confirmation Dialog

```tsx
const [showConfirm, setShowConfirm] = useState(false);

const handleDelete = () => {
  deleteItem();
  setShowConfirm(false);
};

<Button title="Delete" onPress={() => setShowConfirm(true)} />

<SwiftUISheet
  isPresented={showConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item? This action cannot be undone."
  primaryButtonTitle="Delete"
  secondaryButtonTitle="Cancel"
  onDismiss={() => setShowConfirm(false)}
  onPrimaryAction={handleDelete}
  onSecondaryAction={() => setShowConfirm(false)}
/>
```

### Imperative Control

```tsx
import { useRef } from 'react';

function MyComponent() {
  const sheetRef = useRef<SwiftUISheetHandle>(null);

  const showSheet = () => {
    sheetRef.current?.present();
  };

  const hideSheet = () => {
    sheetRef.current?.dismiss();
  };

  return (
    <View>
      <Button title="Show Sheet" onPress={showSheet} />
      <Button title="Hide Sheet" onPress={hideSheet} />

      <SwiftUISheet
        ref={sheetRef}
        title="Imperative Sheet"
        message="This sheet is controlled with ref methods"
        primaryButtonTitle="OK"
        onDismiss={() => console.log('Sheet dismissed')}
        onPrimaryAction={() => {
          console.log('OK pressed');
          sheetRef.current?.dismiss();
        }}
      />
    </View>
  );
}
```

### Information Sheet

```tsx
<SwiftUISheet
  isPresented={showInfo}
  title="About"
  message="Version 1.0.0\n\nThis app demonstrates SwiftUI integration with React Native."
  primaryButtonTitle="Close"
  onDismiss={() => setShowInfo(false)}
  onPrimaryAction={() => setShowInfo(false)}
/>
```

### Action Selection

```tsx
const [action, setAction] = useState<string | null>(null);

<SwiftUISheet
  isPresented={showActions}
  title="Choose Action"
  message="What would you like to do?"
  primaryButtonTitle="Share"
  secondaryButtonTitle="Copy"
  onDismiss={() => setShowActions(false)}
  onPrimaryAction={() => {
    setAction('share');
    setShowActions(false);
  }}
  onSecondaryAction={() => {
    setAction('copy');
    setShowActions(false);
  }}
/>
```

### Error Alert

```tsx
const [error, setError] = useState<string | null>(null);

<SwiftUISheet
  isPresented={!!error}
  title="Error"
  message={error ?? ''}
  primaryButtonTitle="Retry"
  secondaryButtonTitle="Cancel"
  onDismiss={() => setError(null)}
  onPrimaryAction={() => {
    setError(null);
    retry();
  }}
  onSecondaryAction={() => setError(null)}
/>
```

### With Custom Content Pattern

For sheets with custom content, consider using the tree-based `SwiftUI.Sheet`:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';

<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.Sheet
    isPresented={showEdit}
    title="Edit Profile"
    detents={['medium', 'large']}
    onDismiss={() => setShowEdit(false)}
  >
    <SwiftUI.Form>
      <SwiftUI.Section>
        <SwiftUI.TextField label="Name" text={name} onChange={setName} />
        <SwiftUI.TextField label="Bio" text={bio} onChange={setBio} multiline />
      </SwiftUI.Section>
      <SwiftUI.Button title="Save" onPress={handleSave} />
    </SwiftUI.Form>
  </SwiftUI.Sheet>
</SwiftUI>
```
