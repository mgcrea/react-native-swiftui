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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

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
        style={{
          // width: '200',
          height: '100%',
          // backgroundColor: 'red',
        }}>
        <SwiftUI.Form>
          <SwiftUI.Section header="Section 1">
            <SwiftUI.Picker
              label="Workout Type"
              selection="option2"
              options={['option1', 'option2', 'option3']}
              pickerStyle="menu"
            />
          </SwiftUI.Section>
          <SwiftUI.Section header="Section 2">
            <SwiftUI.DatePicker
              label="Workout Date"
              selection={new Date('2024-03-03T00:00:00Z')}
              displayedComponents="date"
            />
          </SwiftUI.Section>
          <SwiftUI.Section header="Section 3">
            <SwiftUI.TextField placeholder="Enter duration" text="60" />
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
