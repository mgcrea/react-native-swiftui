import { useState, type FunctionComponent } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '../components';
import { SwiftUISheet } from '@mgcrea/react-native-swiftui/src';

export const StandaloneSheetExample: FunctionComponent = () => {
  const [isPresented, setIsPresented] = useState(false);

  const handleShowSheet = () => {
    setIsPresented(true);
  };

  const handleCloseSheet = () => {
    setIsPresented(false);
  };

  const handleConfirm = () => {
    setIsPresented(false);
    Alert.alert('Confirmed', 'Primary action triggered');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.title}>StandaloneSheetExample</Text>
        <Text style={styles.subtitle}>Using SwiftUISheet directly</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preview</Text>
          <Text style={styles.bodyText}>
            Tap the button below to present a SwiftUI sheet controlled from
            React Native. The sheet uses the native presentation controller and
            supports detents, titles, messages, and action callbacks.
          </Text>

          <AnimatedButton title="Present Sheet" onPress={handleShowSheet} />
        </View>
      </ScrollView>

      <SwiftUISheet
        isPresented={isPresented}
        detents={['medium', 'large']}
        title="SwiftUI Sheet"
        message="This sheet is presented directly from React Native via a SwiftUI bridge."
        primaryButtonTitle="Confirm"
        secondaryButtonTitle="Cancel"
        onDismiss={handleCloseSheet}
        onPrimaryAction={handleConfirm}
        onSecondaryAction={handleCloseSheet}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
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
