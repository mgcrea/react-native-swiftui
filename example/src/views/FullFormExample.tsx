import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import {useState, type FunctionComponent} from 'react';
import {PlatformColor, View} from 'react-native';
import logoImage from '../assets/logo.png';

export const FullFormExample: FunctionComponent = () => {
  return (
    <View style={{flex: 1}}>
      <SwiftUI style={{flex: 1}}>
        <SwiftUI.VStack>
          <SwiftUI.Text text="FullFormExample" />
          <SwiftUI.Form>
            <LazyVGridSection />
            <TextFieldSection />
            <PickerMenuSection />
            <PickerSegmentedSection />
            <DatePickerSection />
            <MultiPickerSection />
            <StepperSection />
            <SliderSection />
            <ToggleSection />
            <ImageSection />
            <RectangleSection />
          </SwiftUI.Form>
        </SwiftUI.VStack>
      </SwiftUI>
    </View>
  );
};

const TextFieldSection: FunctionComponent = () => {
  const [firstName, setFirstName] = useState('John');
  return (
    <SwiftUI.Section header="TextField Example">
      <SwiftUI.TextField
        label="First name"
        placeholder="John"
        onChange={setFirstName}
        text={firstName}
      />
      <SwiftUI.Button
        title={`Set first name to '${firstName === 'John' ? 'Jane' : 'John'}'`}
        onPress={() => setFirstName(firstName === 'John' ? 'Jane' : 'John')}
      />
    </SwiftUI.Section>
  );
};

const PickerSegmentedSection: FunctionComponent = () => {
  const [options, setOptions] = useState(['x1', 'x2', 'x3']);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <SwiftUI.Section header="Picker Segmented Example">
      <SwiftUI.Picker
        label="Scale"
        selection={selectedOption}
        options={options}
        onChange={value => setSelectedOption(value)}
        pickerStyle="segmented"
      />
      <SwiftUI.Button
        title={`Add a new option 'x${options.length + 1}'`}
        onPress={() => {
          setOptions([...options, `x${options.length + 1}`]);
        }}
      />
    </SwiftUI.Section>
  );
};

const PickerMenuSection: FunctionComponent = () => {
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <SwiftUI.Section header="Picker Menu Example">
      <SwiftUI.Picker
        label="Option"
        selection={selectedOption}
        options={options}
        onChange={value => setSelectedOption(value)}
        pickerStyle="menu"
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
const HOURS = Array.from({length: 24}, (_, i) => i.toString());
const MINUTES = Array.from({length: 60}, (_, i) => i.toString());
const SECONDS = Array.from({length: 60}, (_, i) => i.toString());

const MultiPickerSection: FunctionComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    '0',
    '0',
    '0',
  ]);
  const components = [
    {label: 'hour', options: HOURS, width: 50},
    {label: 'min', options: MINUTES},
    {label: 'sec', options: SECONDS},
  ];
  return (
    <SwiftUI.Section header="MultiPicker Example">
      <SwiftUI.Text
        text={`Selected options: ${selectedOptions.join(', ')}`}
        style={{color: PlatformColor('systemGray2')}}
      />
      <SwiftUI.MultiPicker
        label="Duration"
        components={components}
        selections={selectedOptions}
        onChange={value => setSelectedOptions(value)}
        style={{height: 216}}
      />
      <SwiftUI.Button
        title={`Set to 1h 30m 45s`}
        onPress={() => setSelectedOptions(['1', '30', '45'])}
      />
    </SwiftUI.Section>
  );
};

const DatePickerSection: FunctionComponent = () => {
  const [birthDate, setBirthDate] = useState(new Date('2019-06-03T00:00:00'));
  return (
    <SwiftUI.Section header="DatePicker Example">
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
    <SwiftUI.Section header="Toggle Example">
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
    <SwiftUI.Section header="Slider Example">
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
    <SwiftUI.Section header="Stepper Example">
      <SwiftUI.Stepper
        label={`Value: ${value}`}
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

const RectangleSection: FunctionComponent = () => {
  const [color, setColor] = useState('blue');

  return (
    <SwiftUI.Section header="Rectangle Example">
      <SwiftUI.HStack
        spacing={25}
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
        }}>
        <SwiftUI.Rectangle
          style={{backgroundColor: color, width: 25, height: 50}}
        />
        <SwiftUI.Rectangle
          style={{backgroundColor: 'red', width: 25, height: 50}}
        />
      </SwiftUI.HStack>

      <SwiftUI.Button
        title={`Change flag to ${color === 'blue' ? 'Italy' : 'France'}`}
        onPress={() => setColor(color === 'blue' ? 'green' : 'blue')}
      />
    </SwiftUI.Section>
  );
};

const ImageSection: FunctionComponent = () => {
  const [icon, setIcon] = useState('iphone');

  return (
    <SwiftUI.Section header="Image Example">
      <SwiftUI.HStack>
        <SwiftUI.Image
          source={logoImage}
          resizeMode="contain"
          style={{
            width: 128,
            height: 128,
            borderWidth: 1,
            borderColor: 'blue',
            borderRadius: 64,
          }}
        />
        <SwiftUI.Image
          name={`system:${icon}`}
          // tintColor="#FF0000"
          style={{width: 128, height: 128, fontSize: 64, color: 'blue'}}
        />
      </SwiftUI.HStack>
      <SwiftUI.Button
        title={`Change icon to ${icon === 'iphone' ? 'ipad' : 'iphone'}`}
        onPress={() => setIcon(icon === 'iphone' ? 'ipad' : 'iphone')}
      />
    </SwiftUI.Section>
  );
};

const LazyVGridSection: FunctionComponent = () => {
  return (
    <SwiftUI.Section header="LazyVGrid Example">
      <SwiftUI.LazyVGrid
        columns={[
          {type: 'flexible', minimum: 100},
          {type: 'flexible', minimum: 100},
        ]}
        spacing={10}
        alignment="center">
        <SwiftUI.Text text="Item 1" />
        <SwiftUI.Text text="Item 2" />
        <SwiftUI.Text text="Item 3" />
        <SwiftUI.Text text="Item 4" />
      </SwiftUI.LazyVGrid>
    </SwiftUI.Section>
  );
};
