import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { useForm } from '@tanstack/react-form';
import { AnimatedButton, ScreenContainer } from '../components';

const GENDERS = {
  male: 'Male',
  female: 'Female',
} as const;
const GENDER_OPTIONS = toLabelledOptions(GENDERS);
type Gender = keyof typeof GENDERS;

const LEVELS = {
  B: 'Beginner',
  N: 'Novice',
  I: 'Intermediate',
  A: 'Advanced',
  E: 'Elite',
} as const;
const LEVEL_OPTIONS = toLabelledOptions(LEVELS);
type Level = keyof typeof LEVELS;

type FormData = {
  firstName: string;
  lastName: string;
  gender: Gender;
  level: Level;
  birthDate: Date;
};

const defaultValues: FormData = {
  firstName: 'Olivier',
  lastName: '',
  gender: 'male',
  level: 'B',
  birthDate: new Date('1990-02-22T00:00:00Z'),
};

export function TanStackFormScreen() {
  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      console.log('Submitted with data:', JSON.stringify(value, null, 2));
    },
  });

  return (
    <ScreenContainer>
      <SwiftUI style={{ flex: 1 }} debug>
        <SwiftUI.Form>
          <SwiftUI.Section header="Personal Information">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? 'A first name is required'
                    : value.length < 3
                      ? 'First name must be at least 3 characters'
                      : undefined,
              }}
            >
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
                onChange: ({ value }) =>
                  !value
                    ? 'A last name is required'
                    : value.length < 3
                      ? 'Last name must be at least 3 characters'
                      : undefined,
              }}
            >
              {field => (
                <SwiftUI.TextField
                  placeholder="Last name"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  text={field.state.value}
                />
              )}
            </form.Field>
            <form.Field name="gender">
              {field => (
                <SwiftUI.Picker
                  label="Gender"
                  options={GENDER_OPTIONS}
                  pickerStyle="menu"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  selection={field.state.value}
                />
              )}
            </form.Field>
            <form.Field name="level">
              {field => (
                <SwiftUI.Picker
                  label="Level"
                  options={LEVEL_OPTIONS}
                  pickerStyle="menu"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  selection={field.state.value}
                />
              )}
            </form.Field>
            <form.Field
              name="birthDate"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'A birth date is required' : undefined,
              }}
            >
              {field => (
                <SwiftUI.DatePicker
                  label="Birth Date:"
                  selection={field.state.value}
                  displayedComponents="date"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  datePickerStyle="automatic"
                />
              )}
            </form.Field>
          </SwiftUI.Section>
          <SwiftUI.Button title="Submit" onPress={() => form.handleSubmit()} />
        </SwiftUI.Form>
      </SwiftUI>
      <AnimatedButton title="Pulse Animation" variant="pulse" />
    </ScreenContainer>
  );
}

function toLabelledOptions<
  K extends keyof T,
  T extends Record<string | number, string>,
>(options: T) {
  return Object.entries(options).map(([value, label]) => ({
    value: value as K,
    label,
  }));
}
