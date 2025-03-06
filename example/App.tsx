/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  NativePickerView,
  NativeContainerView,
  SwiftUI,
} from '@mgcrea/react-native-swiftui/src';

const CATEGORIES = ['Strength', 'Gymnastics', 'Cardio', 'Mixed'];

const MOVEMENTS = {
  Strength: ['Deadlift', 'Squat', 'Bench Press', 'Shoulder Press'],
  Gymnastics: ['Pull-up', 'Push-up', 'Sit-up', 'Handstand'],
  Cardio: ['Run', 'Row', 'Bike', 'Swim'],
  Mixed: ['Murph', 'Fran', 'Helen', 'Grace'],
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [category, setCategory] = React.useState('Strength');
  const [movement, setMovement] = React.useState('');
  const [stepperValue, setStepperValue] = React.useState(5);
  const [textValue, setTextValue] = React.useState('60');

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <NativePickerView
        style={{width: '100%', height: 100}}
        options={['option1', 'option2', 'option3']}
        selection="option2"
        pickerStyle="menu"
        onChange={({nativeEvent}) => {
          const title = 'Result';
          const message = JSON.stringify(nativeEvent);
          Alert.alert(title, message);
        }}
      /> */}
      <SwiftUI
        // onEvent={({nativeEvent}) => {
        //   const title = 'Result';
        //   const message = JSON.stringify(nativeEvent);
        //   Alert.alert(title, message);
        // }}
        style={{
          // width: '200',
          height: '100%',
          // backgroundColor: 'red',
        }}>
        <SwiftUI.Form>
          <SwiftUI.Section
            header="Section 1"
            footer="Adjust settings below"
            isCollapsed={false}>
            <SwiftUI.Picker
              id="my-picker"
              label="Workout Category"
              selection={category}
              options={CATEGORIES}
              pickerStyle="menu"
              onChange={setCategory}
            />
            <SwiftUI.Picker
              id="my-picker2"
              label="Movement Name"
              selection={movement}
              options={MOVEMENTS[category]}
              pickerStyle="menu"
              onChange={setMovement}
            />
          </SwiftUI.Section>
          <SwiftUI.Section header="Section 2">
            <SwiftUI.DatePicker
              label="Workout Date"
              selection={new Date('2024-03-03T00:00:00Z')}
              displayedComponents="date"
            />
            <SwiftUI.Stepper
              id="my-stepper"
              value={stepperValue}
              label="Quantity:"
              minimum={1}
              maximum={10}
              step={1}
              onChange={value => {
                // Alert.alert('Stepper Changed', `New value: ${value}`)
                console.log('Stepper Changed', `New value: ${value}`);
                setStepperValue(value * 1);
              }}
            />
            <SwiftUI.TextField
              label="Duration:"
              placeholder="Enter duration"
              text={stepperValue.toString()}
              keyboardType="numberPad"
              returnKeyType="next"
              // onChange={() => {
              //   Alert.alert('Result', 'Duration changed');
              // }}
            />
          </SwiftUI.Section>
          <SwiftUI.Section header="Section 3">
            {Array.from({length: stepperValue}).map((_, index) => (
              <SwiftUI.TextField
                key={index}
                label={`Duration ${index + 1}:`}
                placeholder="Enter duration"
                keyboardType="numberPad"
                returnKeyType="next"
              />
            ))}
          </SwiftUI.Section>
          <SwiftUI.Section header="Section 3">
            <SwiftUI.TextField
              id="my-textfield"
              label="Duration:"
              placeholder="Enter duration"
              // text={textValue}
              keyboardType="numberPad"
              returnKeyType="next"
              onChange={value => {
                console.log({value});
                setTextValue(value);
              }}
            />
            <SwiftUI.TextField
              label="Duration2:"
              placeholder="Enter duration"
              text="60"
              keyboardType="numberPad"
              returnKeyType="next"
              disabled
              // onChange={() => {
              //   Alert.alert('Result', 'Duration changed');
              // }}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
