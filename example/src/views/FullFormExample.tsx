import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import {useState, type FunctionComponent} from 'react';
import {View} from 'react-native';

export const FullFormExample: FunctionComponent = () => {
  return (
    <View style={{flex: 1}}>
      <SwiftUI style={{flex: 1}}>
        <SwiftUI.Text text="FullFormExample" />
        <SwiftUI.Form>
          <TextFieldSection />
          <PickerSection />
          <DatePickerSection />
          <StepperSection />
          <ToggleSection />
          <SliderSection />
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
};

const TextFieldSection: FunctionComponent = () => {
  const [firstName, setFirstName] = useState('John');
  return (
    <SwiftUI.Section header="TextField">
      <SwiftUI.TextField
        label="First name"
        placeholder="John"
        onChange={setFirstName}
        text={firstName}
      />
      <SwiftUI.Button
        title="Set first name to 'Jane'"
        onPress={() => setFirstName('Jane')}
      />
    </SwiftUI.Section>
  );
};

const PickerSection: FunctionComponent = () => {
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <SwiftUI.Section header="Picker">
      <SwiftUI.Picker
        label="Option"
        selection={selectedOption}
        options={options}
        onChange={value => setSelectedOption(value)}
      />
      <SwiftUI.Button
        title={`Add a new option 'Option ${options.length + 1}'`}
        onPress={() => {
          setOptions([...options, `Option ${options.length + 1}`]);
        }}
      />
    </SwiftUI.Section>
  );
};

const DatePickerSection: FunctionComponent = () => {
  const [birthDate, setBirthDate] = useState(new Date('2019-06-03T00:00:00'));
  return (
    <SwiftUI.Section header="DatePicker">
      <SwiftUI.DatePicker
        label="Birth date"
        selection={birthDate}
        onChange={value => setBirthDate(value)}
        displayedComponents="date"
      />
      <SwiftUI.Button
        title="Roll back one year"
        onPress={() => {
          setBirthDate(date => {
            const nextDate = new Date(date);
            nextDate.setFullYear(date.getFullYear() - 1);
            return nextDate;
          });
        }}
      />
    </SwiftUI.Section>
  );
};

const ToggleSection: FunctionComponent = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <SwiftUI.Section header="Toggle">
      <SwiftUI.Toggle
        label="Enable Feature"
        isOn={isActive}
        onChange={value => setIsActive(value)}
      />
      <SwiftUI.Button
        title="Toggle feature"
        onPress={() => setIsActive(isActive => !isActive)}
      />
    </SwiftUI.Section>
  );
};

const SliderSection: FunctionComponent = () => {
  const [volume, setVolume] = useState(50);
  return (
    <SwiftUI.Section header="Slider">
      <SwiftUI.Slider
        label="Volume"
        value={volume}
        minimum={0}
        maximum={100}
        step={1}
        onChange={value => setVolume(value)}
      />
      <SwiftUI.Button title="Set volume to 75" onPress={() => setVolume(75)} />
    </SwiftUI.Section>
  );
};

const StepperSection: FunctionComponent = () => {
  const [value, setValue] = useState(0);
  return (
    <SwiftUI.Section header="Stepper">
      <SwiftUI.Stepper
        label="Value"
        value={value}
        step={1}
        onChange={value => setValue(value)}
      />
      <SwiftUI.Button
        title="Increment"
        onPress={() => setValue(value => value + 1)}
      />
    </SwiftUI.Section>
  );
};
