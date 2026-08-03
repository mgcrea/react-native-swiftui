import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import { ScreenContainer } from '../components';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function TextFieldValidationScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const emailTouched = email.length > 0;
  const emailError = emailTouched && !isValidEmail(email);

  const passwordTouched = password.length > 0;
  const passwordError = passwordTouched && password.length < 8;

  const usernameTouched = username.length > 0;
  const usernameError = usernameTouched && username.length < 3;

  return (
    <ScreenContainer>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section
            header="Validation States"
            footer="Examples of error and helper text"
          >
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
            <SwiftUI.TextField
              placeholder="Password"
              text={password}
              onChange={setPassword}
              secure
              error={passwordError}
              helperText={
                passwordError
                  ? 'Password must be at least 8 characters'
                  : 'Must be at least 8 characters'
              }
            />
            <SwiftUI.TextField
              placeholder="Username"
              text={username}
              onChange={setUsername}
              error={usernameError}
              helperText={
                usernameError
                  ? 'Username must be at least 3 characters'
                  : 'Choose a unique username'
              }
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Helper Text Only">
            <SwiftUI.TextField
              placeholder="Bio"
              text={bio}
              onChange={setBio}
              multiline
              helperText="Tell us about yourself (optional)"
            />
          </SwiftUI.Section>

          <SwiftUI.Section header="Static Examples">
            <SwiftUI.TextField
              placeholder="Normal field"
              text=""
              helperText="This is a hint message"
            />
            <SwiftUI.TextField
              placeholder="Error field"
              text="invalid@"
              error
              helperText="This field has an error"
            />
            <SwiftUI.TextField
              placeholder="Disabled field"
              text="Cannot edit"
              disabled
              helperText="This field is disabled"
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </ScreenContainer>
  );
}
