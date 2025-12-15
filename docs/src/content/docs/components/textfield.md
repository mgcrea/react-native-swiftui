---
title: TextField
description: Text input field with various configurations
---

The `TextField` component provides a text input field with native SwiftUI styling and keyboard handling.

## Import

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
```

## Usage

```tsx
const [text, setText] = useState('');

<SwiftUI.TextField
  label="Name"
  placeholder="Enter your name"
  text={text}
  onChange={setText}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Current text value |
| `label` | `string` | - | Field label |
| `labelStyle` | `StyleProp<NativeTextStyle>` | - | Style for the label text |
| `placeholder` | `string` | - | Placeholder text |
| `keyboardType` | `"default" \| "numberPad" \| "emailAddress" \| "decimalPad"` | `"default"` | Keyboard type |
| `textContentType` | `"username" \| "password" \| "emailAddress"` | - | Content type for autofill |
| `returnKeyType` | `"default" \| "done" \| "next" \| "search"` | `"default"` | Return key type |
| `autocapitalizationType` | `"none" \| "words" \| "sentences" \| "allCharacters"` | - | Auto-capitalization |
| `submitLabel` | `"continue" \| "done" \| "go" \| "join" \| "next" \| "return" \| "route" \| "search" \| "send"` | - | Submit button label |
| `secure` | `boolean` | `false` | Hide text input (for passwords) |
| `maxLength` | `number \| null` | - | Maximum character length |
| `multiline` | `boolean` | `false` | Allow multiple lines |
| `disabled` | `boolean` | `false` | Disable input |
| `error` | `boolean` | `false` | Display field in error state |
| `helperText` | `string` | - | Helper text displayed below the field |
| `style` | `StyleProp<NativeTextStyle>` | - | Style properties |
| `onChange` | `(value: string) => void` | - | Called when text changes |
| `onFocus` | `() => void` | - | Called when field is focused |
| `onBlur` | `() => void` | - | Called when field loses focus |

## Keyboard Types

```tsx
<SwiftUI.TextField
  label="Email"
  keyboardType="emailAddress"
  textContentType="emailAddress"
  text={email}
  onChange={setEmail}
/>

<SwiftUI.TextField
  label="Phone"
  keyboardType="numberPad"
  text={phone}
  onChange={setPhone}
/>
```

## Secure Input

For password fields:

```tsx
<SwiftUI.TextField
  label="Password"
  placeholder="Enter password"
  secure
  textContentType="password"
  text={password}
  onChange={setPassword}
/>
```

## Multiline Input

```tsx
<SwiftUI.TextField
  label="Bio"
  placeholder="Tell us about yourself"
  multiline
  text={bio}
  onChange={setBio}
  style={{ minHeight: 100 }}
/>
```

## Validation & Helper Text

Use `error` and `helperText` props to provide validation feedback:

```tsx
const [email, setEmail] = useState('');
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const emailTouched = email.length > 0;
const emailError = emailTouched && !isValidEmail;

<SwiftUI.TextField
  placeholder="Email"
  text={email}
  onChange={setEmail}
  keyboardType="emailAddress"
  error={emailError}
  helperText={
    emailError
      ? 'Please enter a valid email address'
      : "We'll never share your email"
  }
/>
```

The helper text appears below the field in a caption style. When `error` is `true`, the text is displayed in red; otherwise, it uses a secondary gray color.

### Helper Text Without Error

You can show hints without an error state:

```tsx
<SwiftUI.TextField
  placeholder="Bio"
  text={bio}
  onChange={setBio}
  multiline
  helperText="Tell us about yourself (optional)"
/>
```

## Focus Events

```tsx
<SwiftUI.TextField
  label="Username"
  text={username}
  onChange={setUsername}
  onFocus={() => setUsernameFocused(true)}
  onBlur={() => {
    setUsernameFocused(false);
    validateUsername();
  }}
/>
```

## Examples

### Login Form with Validation

```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const emailError = email.length > 0 && !isValidEmail;
const passwordError = password.length > 0 && password.length < 8;

<SwiftUI.Form>
  <SwiftUI.Section header="Login">
    <SwiftUI.TextField
      label="Email"
      placeholder="you@example.com"
      keyboardType="emailAddress"
      textContentType="emailAddress"
      autocapitalizationType="none"
      text={email}
      onChange={setEmail}
      error={emailError}
      helperText={emailError ? 'Invalid email address' : undefined}
    />
    <SwiftUI.TextField
      label="Password"
      placeholder="Enter password"
      secure
      textContentType="password"
      text={password}
      onChange={setPassword}
      error={passwordError}
      helperText={passwordError ? 'Must be at least 8 characters' : undefined}
    />
  </SwiftUI.Section>
</SwiftUI.Form>
```

### Character Limit

```tsx
const [bio, setBio] = useState('');
const maxLength = 280;

<SwiftUI.Section header="Bio">
  <SwiftUI.TextField
    placeholder="Write something about yourself"
    multiline
    maxLength={maxLength}
    text={bio}
    onChange={setBio}
  />
  <SwiftUI.Text
    text={`${bio.length}/${maxLength}`}
    style={{ color: '#666', fontSize: 12 }}
  />
</SwiftUI.Section>
```

### Styled TextField

```tsx
<SwiftUI.TextField
  label="Custom Styled"
  text={value}
  onChange={setValue}
  style={{
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  }}
/>
```
