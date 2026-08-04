import {
  SwiftUISheetPicker,
  type SheetPickerOption,
} from '@mgcrea/react-native-swiftui/src';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedButton, ScreenContainer } from '../components';

const FRUITS: SheetPickerOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Coconut', value: 'coconut' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Plum', value: 'plum' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
];

export function StandaloneSheetPickerScreen() {
  const [isPresented, setIsPresented] = useState(false);
  const [selectedValue, setSelectedValue] = useState('apple');
  const [fruits, setFruits] = useState<SheetPickerOption[]>(() => [...FRUITS]);

  const selectedLabel = useMemo(
    () =>
      fruits.find(option => option.value === selectedValue)?.label ?? 'Unknown',
    [fruits, selectedValue],
  );

  const handleAddFruit = () => {
    const newFruit: SheetPickerOption = {
      label: `Custom Fruit ${fruits.length - FRUITS.length + 1}`,
      value: `custom_${Date.now()}`,
    };
    setFruits(prevFruits => [...prevFruits, newFruit]);
    setSelectedValue(newFruit.value);
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Current selection</Text>
        <Text style={styles.bodyText}>Selected fruit: {selectedLabel}</Text>
        <Text style={styles.bodyText}>Total fruits: {fruits.length}</Text>
        <AnimatedButton
          title="Open picker"
          onPress={() => setIsPresented(true)}
          variant="pulse"
        />
        <AnimatedButton
          title="Add a fruit"
          onPress={handleAddFruit}
          variant="bounce"
        />
      </View>

      <SwiftUISheetPicker
        isPresented={isPresented}
        title="Choose a fruit"
        searchPlaceholder="Search fruits"
        options={fruits}
        selectedValue={selectedValue}
        autoDismiss={true}
        onChange={setSelectedValue}
        onDismiss={() => setIsPresented(false)}
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
