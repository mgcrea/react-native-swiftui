import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {NativeColorView} from 'react-native-color-view';

const COLORS = ['#32a852', '#a83232', '#32a8a8', '#a832a8'];

function App(): React.JSX.Element {
  const [colorIndex, setColorIndex] = React.useState(0);
  const onClick = () => {
    setColorIndex((colorIndex + 1) % COLORS.length);
  };
  return (
    <View style={styles.container}>
      <NativeColorView color={COLORS[colorIndex]} style={styles.box} />
      <Button title="Change Color" onPress={onClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'palegreen',
  },
  webview: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
    // backgroundColor: 'red',
  },
});

export default App;
