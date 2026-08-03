import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { ScreenContainer } from '../components';

type FormData = {
  firstName: string;
  lastName: string;
  birthDate: Date;
};

export function ReactHookFormScreen() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      firstName: 'Olivier',
      lastName: '',
      birthDate: new Date('1990-02-22T00:00:00Z'),
    },
  });

  const onValidSubmit = (data: FormData) => {
    console.log('Submitted with data:', JSON.stringify(data, null, 2));
    Alert.alert('Success', JSON.stringify(data, null, 2));
  };

  const onInvalidSubmit = (errors: unknown) => {
    Alert.alert('Validation Error', JSON.stringify(errors, null, 2));
  };

  return (
    <ScreenContainer>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
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
              rules={{ required: true }}
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
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <SwiftUI.DatePicker
                  label="Birth Date:"
                  selection={value}
                  displayedComponents="date"
                  onChange={onChange}
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
      </SwiftUI>
    </ScreenContainer>
  );
}
