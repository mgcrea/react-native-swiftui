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
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(50);

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
        <SwiftUI.Text text="BasicFormExample" />

        <SwiftUI.Button
          title="1 Jan 1970"
          style={{
            backgroundColor: '#efeff0',
            // paddingVertical: 7,
            // paddingHorizontal: 12,
            // borderRadius: 8,
            // borderWidth: 1,
          }}
          // buttonStyle="bordered"
          onPress={() => console.log('Left pressed')}
        />
        <SwiftUI.Button
          title="1 Jan 1970"
          style={{
            backgroundColor: '#efeff0',
            paddingVertical: 7,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
          buttonStyle="subtle"
          onPress={() => console.log('Left pressed')}
        />
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <SwiftUI.VStack alignment="center" spacing={30}>
              <SwiftUI.Text text="Title" style={{font: 'title'}} />
              <SwiftUI.HStack alignment="center" spacing={8}>
                <SwiftUI.Button
                  title="Right"
                  buttonStyle="plain"
                  onPress={() => console.log('Right pressed')}
                />
              </SwiftUI.HStack>
            </SwiftUI.VStack>
          </SwiftUI.Section>
          <SwiftUI.Section header="Personal Information">
            <SwiftUI.HStack alignment="center" spacing={8}>
              <SwiftUI.TextField
                label="Weight:"
                placeholder="20"
                onChange={setFirstName}
                keyboardType="decimalPad"
                text={firstName}
              />
              <SwiftUI.Text text="kg" style={{color: 'red', fontWeight: 800}} />
              <SwiftUI.Button
                title="Left"
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                  borderColor: 'blue',
                  borderWidth: 1,
                  borderRadius: 10,
                  font: 'body',
                }}
                buttonStyle="plain"
                onPress={() => console.log('Left pressed')}
              />
            </SwiftUI.HStack>
            <SwiftUI.TextField
              placeholder="Last name"
              onChange={setLastName}
              text={lastName}
            />
            <SwiftUI.HStack>
              <SwiftUI.Button
                title="1 Jan 1970"
                style={{
                  backgroundColor: '#efeff0',
                  paddingVertical: 7,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                }}
                buttonStyle="picker"
                onPress={() => console.log('Left pressed')}
              />
              <SwiftUI.DatePicker
                selection={birthDate}
                displayedComponents="date" // Show only date, no time
                onChange={setBirthDate}
                // disabled
                datePickerStyle="automatic"
              />
            </SwiftUI.HStack>
            <SwiftUI.Toggle
              label="Enable Feature"
              isOn={isActive}
              onChange={value => setIsActive(value)}
            />
          </SwiftUI.Section>
          <SwiftUI.Section header="Slider">
            <SwiftUI.Slider
              label="Volume"
              value={volume}
              minimum={0}
              maximum={100}
              step={1}
              onChange={value => setVolume(value)}
            />
            <SwiftUI.Button title="Set to 75" onPress={() => setVolume(75)} />
          </SwiftUI.Section>
          <SwiftUI.Button title="Submit" onPress={handleSubmit} />
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
};
