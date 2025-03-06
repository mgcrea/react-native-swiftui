import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {SwiftUI} from '@mgcrea/react-native-swiftui/src';
import {Alert, View} from 'react-native';
import {type FunctionComponent} from 'react';

type FormData = {
  firstName: string;
  lastName: string;
};

export const ReactHookFormExample: FunctionComponent = () => {
  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {firstName: 'Olivier'},
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log('Submitted with data:', data);
  };

  return (
    <View style={{flex: 1}}>
      <SwiftUI style={{flex: 1}}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Section 1">
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <SwiftUI.TextField
                  placeholder="First name"
                  onBlur={onBlur}
                  onChange={onChange}
                  text={value}
                />
              )}
            />
            <SwiftUI.Button
              id="A"
              title="Submit"
              onPress={handleSubmit(onSubmit)}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
};
