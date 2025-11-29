---
title: Button
description: Interactive button component with various styles
---

The `Button` component creates a tappable button with native SwiftUI styling.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
<SwiftUI.Button
  title="Press Me"
  onPress={() => console.log('Button pressed!')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Button text label |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `buttonStyle` | `NativeButtonStyle` | `"default"` | Visual style of the button |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onPress` | `() => void` | - | Callback when button is pressed |
| `children` | `ReactNode` | - | Custom button content |

## Button Styles

```tsx
<SwiftUI.VStack spacing={10}>
  <SwiftUI.Button title="Default" buttonStyle="default" onPress={() => {}} />
  <SwiftUI.Button title="Plain" buttonStyle="plain" onPress={() => {}} />
  <SwiftUI.Button title="Bordered" buttonStyle="bordered" onPress={() => {}} />
  <SwiftUI.Button title="Bordered Prominent" buttonStyle="borderedProminent" onPress={() => {}} />
  <SwiftUI.Button title="Borderless" buttonStyle="borderless" onPress={() => {}} />
</SwiftUI.VStack>
```

Available styles:
- `default` - Standard button appearance
- `plain` - Text-only button
- `bordered` - Button with border
- `borderedProminent` - Filled button with accent color
- `borderless` - Button without border
- `subtle` - Subtle button style
- `picker` - Style optimized for picker buttons

## Disabled State

```tsx
<SwiftUI.Button
  title="Disabled Button"
  disabled
  onPress={() => {}}
/>
```

## Custom Content

Buttons can contain child components:

```tsx
<SwiftUI.Button onPress={() => {}}>
  <SwiftUI.HStack spacing={8}>
    <SwiftUI.Image name="system:star.fill" style={{ color: 'gold' }} />
    <SwiftUI.Text text="Favorite" />
  </SwiftUI.HStack>
</SwiftUI.Button>
```

## Styling

```tsx
<SwiftUI.Button
  title="Styled Button"
  style={{
    color: 'white',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  }}
  onPress={() => {}}
/>
```

## Examples

### Form Submit Button

```tsx
<SwiftUI.Form>
  <SwiftUI.Section header="Account">
    <SwiftUI.TextField label="Email" text={email} onChange={setEmail} />
    <SwiftUI.TextField label="Password" text={password} onChange={setPassword} secure />
  </SwiftUI.Section>
  <SwiftUI.Section>
    <SwiftUI.Button
      title="Sign In"
      buttonStyle="borderedProminent"
      onPress={handleSignIn}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Action Buttons

```tsx
<SwiftUI.HStack spacing={16}>
  <SwiftUI.Button
    title="Cancel"
    buttonStyle="bordered"
    onPress={handleCancel}
  />
  <SwiftUI.Button
    title="Confirm"
    buttonStyle="borderedProminent"
    onPress={handleConfirm}
  />
</SwiftUI.HStack>
```

### Conditional Disable

```tsx
const [isValid, setIsValid] = useState(false);

<SwiftUI.Button
  title="Submit"
  disabled={!isValid}
  onPress={handleSubmit}
/>
```
