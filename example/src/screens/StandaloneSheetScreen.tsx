import { SwiftUISheet } from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AnimatedButton, ScreenContainer } from '../components';

export function StandaloneSheetScreen() {
  const [isPresented, setIsPresented] = useState(false);

  const handleConfirm = () => {
    setIsPresented(false);
    Alert.alert('Confirmed', 'Primary action triggered');
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Preview</Text>
        <Text style={styles.bodyText}>
          Tap the button below to present a SwiftUI sheet controlled from React
          Native. The sheet uses the native presentation controller and supports
          detents, titles, messages, and action callbacks.
        </Text>
        <AnimatedButton
          title="Present Sheet"
          onPress={() => setIsPresented(true)}
        />
      </View>

      <SwiftUISheet
        isPresented={isPresented}
        detents={['medium', 'large']}
        title="SwiftUI Sheet"
        message="This sheet is presented directly from React Native via a SwiftUI bridge."
        primaryButtonTitle="Confirm"
        secondaryButtonTitle="Cancel"
        onDismiss={() => setIsPresented(false)}
        onPrimaryAction={handleConfirm}
        onSecondaryAction={() => setIsPresented(false)}
        style={{ flex: 1 }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  bodyText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
});
