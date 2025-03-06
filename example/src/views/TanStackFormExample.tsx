// import {
//   useForm,
//   Controller,
//   SubmitHandler,
//   SubmitErrorHandler,
// } from 'react-hook-form';

import {useForm} from '@tanstack/react-form';
import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import {Alert, Text, TextInput, View} from 'react-native';
import {type FunctionComponent} from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export const TanStackFormExample: FunctionComponent = () => {
  const form = useForm({
    defaultValues: {
      firstName: 'Olivier',
      lastName: '',
      birthDate: new Date('1990-02-22T00:00:00Z'),
    },
    onSubmit: ({value}) => {
      console.log('Submitted with data:', JSON.stringify(value, null, 2));
    },
  });

  return (
    <View style={{flex: 1}}>
      <SwiftUI style={{flex: 1}}>
        <SwiftUI.Text text="TanStackFormExample" />
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({value}) =>
                  !value
                    ? 'A first name is required'
                    : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
              }}>
              {field => (
                <SwiftUI.TextField
                  placeholder="First name"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  text={field.state.value}
                />
              )}
            </form.Field>
            <form.Field
              name="lastName"
              validators={{
                onChange: ({value}) =>
                  !value
                    ? 'A last name is required'
                    : value.length < 3
                    ? 'Last name must be at least 3 characters'
                    : undefined,
              }}>
              {field => (
                <SwiftUI.TextField
                  placeholder="First name"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  text={field.state.value}
                />
              )}
            </form.Field>
            <form.Field
              name="birthDate"
              validators={{
                onChange: ({value}) =>
                  !value ? 'A birth date is required' : undefined,
              }}>
              {field => (
                <SwiftUI.DatePicker
                  label="Birth Date:"
                  selection={field.state.value}
                  displayedComponents="date" // Show only date, no time
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  datePickerStyle="automatic"
                />
              )}
            </form.Field>
            {/* <Controller
              name="lastName"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <SwiftUI.TextField
                  placeholder="Last name"
                  onBlur={onBlur}
                  onChange={onChange}
                  text={value}
                />
              )}
            />
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <SwiftUI.DatePicker
                  label="Birth Date:"
                  selection={value}
                  displayedComponents="date" // Show only date, no time
                  onChange={onChange}
                  // disabled
                  datePickerStyle="automatic"
                />
              )}
            /> */}
          </SwiftUI.Section>
          <SwiftUI.Button
            title="Submit"
            onPress={() => {
              form.handleSubmit();
            }}
          />
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
};
