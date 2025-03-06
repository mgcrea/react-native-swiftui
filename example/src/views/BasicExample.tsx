import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import type {FunctionComponent} from 'react';
import React from 'react';
import {Alert} from 'react-native';

const CATEGORIES = ['Strength', 'Gymnastics', 'Cardio', 'Mixed'];

const MOVEMENTS = {
  Strength: ['Deadlift', 'Squat', 'Bench Press', 'Shoulder Press'],
  Gymnastics: ['Pull-up', 'Push-up', 'Sit-up', 'Handstand'],
  Cardio: ['Run', 'Row', 'Bike', 'Swim'],
  Mixed: ['Murph', 'Fran', 'Helen', 'Grace'],
};

export const BasicExample: FunctionComponent = () => {
  const [category, setCategory] = React.useState('Strength');
  const [movement, setMovement] = React.useState('');
  const [stepperValue, setStepperValue] = React.useState(5);
  const [textValue, setTextValue] = React.useState('60');

  return (
    <SwiftUI style={{flex: 1}}>
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
        <SwiftUI.Button
          title="Submit"
          onPress={() => {
            console.log('Form submitted with duration:', textValue);
            Alert.alert('Submitted', `Duration: ${textValue}`);
          }}
        />
      </SwiftUI.Form>
    </SwiftUI>
  );
};
