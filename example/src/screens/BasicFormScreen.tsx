import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import { Alert } from 'react-native';
import { ScreenContainer } from '../components';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export function BasicFormScreen() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [birthDate, setBirthDate] = useState(new Date('2019-06-03T00:00:00Z'));
  const [gender, setGender] = useState('male');

  const handleSubmit = () => {
    const data = { firstName, lastName, birthDate, gender };
    Alert.alert('Submitted', JSON.stringify(data, null, 2));
  };

  return (
    <ScreenContainer>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <SwiftUI.TextField
              placeholder="First name"
              onChange={setFirstName}
              text={firstName}
            />
            <SwiftUI.TextField
              placeholder="Last name"
              onChange={setLastName}
              text={lastName}
            />
          </SwiftUI.Section>
          <SwiftUI.Section header="Additional Details">
            <SwiftUI.Picker
              options={GENDER_OPTIONS}
              label="Gender"
              onChange={setGender}
              value={gender}
            />
            <SwiftUI.DatePicker
              label="Birth date"
              selection={birthDate}
              onChange={setBirthDate}
              displayedComponents="date"
            />
          </SwiftUI.Section>
          <SwiftUI.Button title="Submit" onPress={handleSubmit} />
        </SwiftUI.Form>
      </SwiftUI>
    </ScreenContainer>
  );
}
