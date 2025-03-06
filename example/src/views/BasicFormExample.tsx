import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import {Alert, TextInput, View} from 'react-native';
import {useState, type FunctionComponent} from 'react';

export const BasicFormExample: FunctionComponent = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [birthDate, setBirthDate] = useState(new Date('1970-01-01T00:00:00'));

  const handleSubmit = () => {
    const data = {
      firstName,
      lastName,
      birthDate,
    };
    console.log('Submitted with data:', JSON.stringify(data, null, 2));
  };

  return (
    <View style={{flex: 1}}>
      <SwiftUI style={{flex: 1}}>
        <SwiftUI.Form>
          <SwiftUI.Text text="BasicFormExample" />
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
            <SwiftUI.DatePicker
              label="Birth Date:"
              selection={birthDate}
              displayedComponents="date" // Show only date, no time
              onChange={setBirthDate}
              // disabled
              datePickerStyle="automatic"
            />
          </SwiftUI.Section>
          <SwiftUI.Button title="Submit" onPress={handleSubmit} />
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
};
