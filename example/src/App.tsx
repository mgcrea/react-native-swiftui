import React from 'react';
import { NavigationContainer, type LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen';
import { BasicFormScreen } from './screens/BasicFormScreen';
import { DynamicFormScreen } from './screens/DynamicFormScreen';
import { FullFormScreen } from './screens/FullFormScreen';
import { LayoutScreen } from './screens/LayoutScreen';
import { SFSymbolScreen } from './screens/SFSymbolScreen';
import { StandalonePickerScreen } from './screens/StandalonePickerScreen';
import { StandaloneSheetScreen } from './screens/StandaloneSheetScreen';
import { StandaloneSheetPickerScreen } from './screens/StandaloneSheetPickerScreen';
import { ReactHookFormScreen } from './screens/ReactHookFormScreen';
import { TanStackFormScreen } from './screens/TanStackFormScreen';
import { TextFieldValidationScreen } from './screens/TextFieldValidationScreen';

export type RootStackParamList = {
  Home: undefined;
  BasicForm: undefined;
  DynamicForm: undefined;
  FullForm: undefined;
  Layout: undefined;
  SFSymbol: undefined;
  StandalonePicker: undefined;
  StandaloneSheet: undefined;
  StandaloneSheetPicker: undefined;
  ReactHookForm: undefined;
  TanStackForm: undefined;
  TextFieldValidation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Deep links, e.g. `xcrun simctl openurl booted rnswiftui://FullForm`. Handy to jump
// straight to a screen when smoke-testing the native bridge.
const SCREENS: (keyof RootStackParamList)[] = [
  'Home',
  'BasicForm',
  'DynamicForm',
  'FullForm',
  'Layout',
  'SFSymbol',
  'StandalonePicker',
  'StandaloneSheet',
  'StandaloneSheetPicker',
  'ReactHookForm',
  'TanStackForm',
  'TextFieldValidation',
];

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['rnswiftui://'],
  config: {
    screens: Object.fromEntries(SCREENS.map((name) => [name, name])) as Record<
      keyof RootStackParamList,
      string
    >,
  },
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Examples' }}
        />
        <Stack.Screen
          name="BasicForm"
          component={BasicFormScreen}
          options={{ title: 'Basic Form' }}
        />
        <Stack.Screen
          name="DynamicForm"
          component={DynamicFormScreen}
          options={{ title: 'Dynamic Form' }}
        />
        <Stack.Screen
          name="FullForm"
          component={FullFormScreen}
          options={{ title: 'Full Form' }}
        />
        <Stack.Screen
          name="Layout"
          component={LayoutScreen}
          options={{ title: 'Layout' }}
        />
        <Stack.Screen
          name="SFSymbol"
          component={SFSymbolScreen}
          options={{ title: 'SF Symbols' }}
        />
        <Stack.Screen
          name="StandalonePicker"
          component={StandalonePickerScreen}
          options={{ title: 'Standalone Picker' }}
        />
        <Stack.Screen
          name="StandaloneSheet"
          component={StandaloneSheetScreen}
          options={{ title: 'Standalone Sheet' }}
        />
        <Stack.Screen
          name="StandaloneSheetPicker"
          component={StandaloneSheetPickerScreen}
          options={{ title: 'Sheet Picker' }}
        />
        <Stack.Screen
          name="ReactHookForm"
          component={ReactHookFormScreen}
          options={{ title: 'React Hook Form' }}
        />
        <Stack.Screen
          name="TanStackForm"
          component={TanStackFormScreen}
          options={{ title: 'TanStack Form' }}
        />
        <Stack.Screen
          name="TextFieldValidation"
          component={TextFieldValidationScreen}
          options={{ title: 'TextField Validation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
