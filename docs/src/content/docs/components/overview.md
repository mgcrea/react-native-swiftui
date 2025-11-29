---
title: Components Overview
description: Understanding how SwiftUI components work in React Native
---

React Native SwiftUI provides a comprehensive set of components that render native SwiftUI views. This page explains the architecture and patterns used throughout the library.

## Architecture

### The SwiftUI Root

All SwiftUI components must be wrapped in a `SwiftUI` root container:

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { View } from 'react-native';

<View style={{ flex: 1 }}>
  <SwiftUI style={{ flex: 1 }}>
    {/* Components here */}
  </SwiftUI>
</View>
```

The root component:
- Creates a bridge between React and native SwiftUI
- Manages the component tree and event handling
- Renders all descendant components natively

### Component Registration

When you use a SwiftUI component, it doesn't render a React Native view. Instead, it:

1. Registers itself in a virtual tree
2. Returns `null` from the render function
3. The native side reads this tree and renders actual SwiftUI views

This means you cannot inspect SwiftUI components in React DevTools, but they will appear in Xcode's view debugger.

## Component Categories

### Form Controls

Input components for building forms:

| Component | Description |
|-----------|-------------|
| [TextField](/components/textfield/) | Text input field |
| [NumberField](/components/numberfield/) | Numeric input with formatting |
| [Toggle](/components/toggle/) | Boolean switch |
| [Slider](/components/slider/) | Range value selector |
| [Stepper](/components/stepper/) | Increment/decrement control |
| [DatePicker](/components/datepicker/) | Date and time selection |
| [Picker](/components/picker/) | Single value selection |
| [MultiPicker](/components/multipicker/) | Multi-column picker |

### Display Components

Components for displaying content:

| Component | Description |
|-----------|-------------|
| [Text](/components/text/) | Text display |
| [Image](/components/image/) | Image display |
| [Button](/components/button/) | Tappable button |

### Container Components

Components for organizing content:

| Component | Description |
|-----------|-------------|
| [Form](/components/form/) | Form container with iOS styling |
| [Section](/components/section/) | Grouped content with header/footer |
| [Sheet](/components/sheet/) | Modal sheet presentation |
| [SheetPicker](/components/sheetpicker/) | Searchable picker in a sheet |

### Layout Components

See the [Layout](/layout/vstack/) section for:
- HStack, VStack, ZStack
- LazyVGrid
- Spacer, Group, Rectangle

## Common Patterns

### State Binding

All interactive components follow a controlled component pattern:

```tsx
const [value, setValue] = useState('');

<SwiftUI.TextField
  text={value}
  onChange={setValue}
/>
```

### Event Handlers

Events are passed as callback props:

```tsx
<SwiftUI.Button
  title="Submit"
  onPress={() => handleSubmit()}
/>

<SwiftUI.TextField
  text={value}
  onChange={(newValue) => setValue(newValue)}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
/>
```

### Styling

Components accept a `style` prop for customization:

```tsx
<SwiftUI.Text
  text="Styled text"
  style={{
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  }}
/>
```

See the [Styling Guide](/guides/styling/) for details on available style properties.

## Limitations

### No Mixed Content

You cannot place React Native views inside the SwiftUI tree:

```tsx
// ❌ Won't work
<SwiftUI style={{ flex: 1 }}>
  <View> {/* Regular RN View inside SwiftUI */}
    <SwiftUI.Text text="Hello" />
  </View>
</SwiftUI>

// ✅ Correct
<SwiftUI style={{ flex: 1 }}>
  <SwiftUI.VStack>
    <SwiftUI.Text text="Hello" />
  </SwiftUI.VStack>
</SwiftUI>
```

### iOS Only

SwiftUI components only render on iOS. For cross-platform apps, you'll need platform-specific code:

```tsx
import { Platform } from 'react-native';

{Platform.OS === 'ios' ? (
  <SwiftUI style={{ flex: 1 }}>
    <SwiftUI.Form>...</SwiftUI.Form>
  </SwiftUI>
) : (
  <AndroidForm />
)}
```
