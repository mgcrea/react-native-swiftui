import { useMemo, useState, type FunctionComponent } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '../components';
import {
  SwiftUISheetPicker,
  type SheetPickerOption,
} from '@mgcrea/react-native-swiftui/src';

const FRUITS: SheetPickerOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Grape', value: 'grape' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pear', value: 'pear' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
];

export const StandaloneSheetPickerExample: FunctionComponent = () => {
  const [isPresented, setIsPresented] = useState(false);
  const [selectedValue, setSelectedValue] = useState('apple');

  const selectedLabel = useMemo(
    () =>
      FRUITS.find(option => option.value === selectedValue)?.label ?? 'Unknown',
    [selectedValue],
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    // Alert.alert('Selection', `You picked ${FRUITS.find(option => option.value === value)?.label ?? value}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>StandaloneSheetPickerExample</Text>
        <Text style={styles.subtitle}>Using SwiftUISheetPicker</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Current selection</Text>
          <Text style={styles.bodyText}>Selected fruit: {selectedLabel}</Text>
          <AnimatedButton
            title="Open picker"
            onPress={() => setIsPresented(true)}
            variant="pulse"
          />
        </View>
      </ScrollView>

      <SwiftUISheetPicker
        isPresented={isPresented}
        title="Choose a fruit"
        searchPlaceholder="Search fruits"
        options={FRUITS}
        selectedValue={selectedValue}
        autoDismiss={false}
        onSelect={value => {
          handleSelect(value);
        }}
        onDismiss={() => setIsPresented(false)}
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
    gap: 12,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bodyText: {
    fontSize: 14,
    color: '#374151',
  },
});
