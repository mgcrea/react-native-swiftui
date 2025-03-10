import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import {useState, type FunctionComponent} from 'react';
import {Alert, View} from 'react-native';

export const BasicFormExample: FunctionComponent = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [birthDate, setBirthDate] = useState(new Date('2019-06-03T00:00:00Z'));
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');

  const handleSubmit = () => {
    const data = {
      firstName,
      lastName,
      birthDate,
      gender,
    };
    Alert.alert('Submitted', JSON.stringify(data, null, 2));
  };

  return (
    <View style={{flex: 1}}>
      <SwiftUI style={{flex: 1}}>
        <SwiftUI.Text text="BasicFormExample" />
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
              options={['Male', 'Female']}
              label="Gender"
              onChange={setGender}
              selection={gender}
            />
            <SwiftUI.DatePicker
              label="Birth date"
              selection={birthDate}
              onChange={value => setBirthDate(value)}
              displayedComponents="date"
            />
          </SwiftUI.Section>
          <SwiftUI.Button title="Submit" onPress={handleSubmit} />
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
};
