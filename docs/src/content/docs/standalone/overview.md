---
title: Standalone Components
description: Native components that can be used outside the SwiftUI tree
---

Standalone components are native SwiftUI components that can be used independently, outside of the `SwiftUI` tree container. They provide direct access to native functionality with imperative APIs.

## When to Use Standalone Components

Use standalone components when you need:

- **Direct native rendering** without the SwiftUI tree overhead
- **Imperative control** with ref handles (show/dismiss)
- **Integration with existing React Native views**
- **SF Symbols** anywhere in your app

## Available Standalone Components

| Component | Description |
|-----------|-------------|
| [SFSymbol](/standalone/sf-symbol/) | Apple SF Symbols with full customization |
| [SwiftUIPicker](/standalone/picker/) | Native picker with imperative control |
| [SwiftUISheet](/standalone/sheet/) | Modal sheet with programmatic presentation |
| [SwiftUISheetPicker](/standalone/sheet-picker/) | Searchable picker in a sheet |

## Standalone vs Tree Components

### Standalone Components

```tsx
import { SFSymbol, SwiftUISheet } from '@mgcrea/react-native-swiftui';

// Can be used anywhere in your React Native app
<View style={styles.container}>
  <SFSymbol name="star.fill" size={24} color="gold" />

  <SwiftUISheet
    isPresented={showSheet}
    title="My Sheet"
    onDismiss={() => setShowSheet(false)}
  />
</View>
```

### Tree Components

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';

// Must be inside SwiftUI root container
<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.Form>
    <SwiftUI.Section>
      <SwiftUI.TextField label="Name" text={name} onChange={setName} />
    </SwiftUI.Section>
  </SwiftUI.Form>
</SwiftUI>
```

## Imperative API

Standalone components support ref-based imperative APIs:

```tsx
import { SwiftUISheet, SwiftUISheetHandle } from '@mgcrea/react-native-swiftui';
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
    <>
      <Button title="Show" onPress={showSheet} />
      <SwiftUISheet
        ref={sheetRef}
        title="My Sheet"
        onDismiss={() => console.log('dismissed')}
      />
    </>
  );
}
```

## Importing

Standalone components are exported directly from the package:

```tsx
import {
  SFSymbol,
  SwiftUIPicker,
  SwiftUISheet,
  SwiftUISheetPicker,
} from '@mgcrea/react-native-swiftui';
```

## Comparison Table

| Feature | Standalone | Tree Components |
|---------|------------|-----------------|
| Requires `SwiftUI` container | No | Yes |
| Imperative API (ref) | Yes | No |
| Works with RN views | Yes | No |
| Full SwiftUI styling | Limited | Yes |
| Forms integration | No | Yes |
| Use case | Isolated widgets | Full SwiftUI layouts |

## Choosing the Right Approach

**Use Standalone when:**
- You need an SF Symbol icon anywhere
- You want a simple sheet/picker without building a full SwiftUI form
- You're integrating with existing React Native components
- You need programmatic show/hide control

**Use Tree Components when:**
- Building complete forms with native iOS styling
- You want the full SwiftUI component library
- Components need to interact (form validation, sections, etc.)
- You're building a primarily SwiftUI-based screen
