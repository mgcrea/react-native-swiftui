import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { Alert, TextInput, View } from 'react-native';
import { type FunctionComponent } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export const ReactHookFormExample: FunctionComponent = () => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: 'Olivier',
      lastName: '',
      birthDate: new Date('1990-02-22T00:00:00Z'),
    },
  });

  const onValidSubmit: SubmitHandler<FormData> = data => {
    console.log('Submitted with data:', JSON.stringify(data, null, 2));
  };

  const onInvalidSubmit: SubmitErrorHandler<FormData> = errors => {
    Alert.alert('Validation Error', JSON.stringify(errors, null, 2));
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.VStack>
          <SwiftUI.Text text="ReactHookFormExample" />
          <SwiftUI.Form>
            <SwiftUI.Section header="Personal Information">
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <SwiftUI.TextField
                    placeholder="First name"
                    onBlur={onBlur}
                    onChange={onChange}
                    text={value}
                    disabled
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
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
                render={({ field: { onChange, value } }) => (
                  <SwiftUI.DatePicker
                    label="Birth Date:"
                    selection={value}
                    displayedComponents="date" // Show only date, no time
                    onChange={onChange}
                    // disabled
                    datePickerStyle="automatic"
                  />
                )}
              />
            </SwiftUI.Section>
            <SwiftUI.Button
              title="Submit"
              onPress={handleSubmit(onValidSubmit, onInvalidSubmit)}
            />
          </SwiftUI.Form>
        </SwiftUI.VStack>
      </SwiftUI>
    </View>
  );
};
