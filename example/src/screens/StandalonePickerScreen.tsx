import {
  SwiftUIPicker,
  type SwiftUIPickerProps,
} from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AnimatedButton, ScreenContainer } from '../components';

type PickerStyle = NonNullable<SwiftUIPickerProps['pickerStyle']>;

const PICKER_STYLE_OPTIONS = [
  { value: 'default', label: 'Default', icon: 'list.bullet' },
  { value: 'inline', label: 'Inline', icon: 'arrow.up.arrow.down' },
  { value: 'menu', label: 'Menu', icon: 'filemenu.and.selection' },
  { value: 'segmented', label: 'Segmented', icon: 'rectangle.split.3x1' },
  { value: 'wheel', label: 'Wheel', icon: 'circle.dotted' },
] as const;

const FRUIT_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const COLOR_OPTIONS = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
];

const SIZE_OPTIONS = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

export function StandalonePickerScreen() {
  const [pickerStyle, setPickerStyle] = useState<PickerStyle>('default');
  const [selectedFruit, setSelectedFruit] = useState('apple');
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedSize, setSelectedSize] = useState('medium');

  const handleShowSelection = () => {
    const data = { pickerStyle, selectedFruit, selectedColor, selectedSize };
    Alert.alert('Current Selection', JSON.stringify(data, null, 2));
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Picker Style</Text>
        <SwiftUIPicker
          label="Style"
          labelColor="#0f62fe"
          value={pickerStyle}
          options={PICKER_STYLE_OPTIONS}
          pickerStyle="segmented"
          onChange={value => setPickerStyle(value as typeof pickerStyle)}
          style={[styles.picker, { tint: '#fb7185' }]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Favorite Fruit</Text>
        <SwiftUIPicker
          label="Select a fruit"
          labelColor="#d97706"
          value={selectedFruit}
          options={FRUIT_OPTIONS}
          pickerStyle={pickerStyle}
          onChange={value => setSelectedFruit(value)}
          style={[styles.picker, { tint: '#22d3ee' }]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Favorite Color</Text>
        <SwiftUIPicker
          label="Select a color"
          labelColor="#2563eb"
          value={selectedColor}
          options={COLOR_OPTIONS}
          pickerStyle={pickerStyle}
          onChange={value => setSelectedColor(value)}
          style={[styles.picker, { tint: '#a855f7' }]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Preferred Size</Text>
        <SwiftUIPicker
          label="Select a size"
          labelColor="#16a34a"
          value={selectedSize}
          options={SIZE_OPTIONS}
          pickerStyle={pickerStyle}
          onChange={value => setSelectedSize(value)}
          style={styles.picker}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Current Selections</Text>
        <Text style={styles.selectionText}>
          Fruit: {FRUIT_OPTIONS.find(o => o.value === selectedFruit)?.label}
        </Text>
        <Text style={styles.selectionText}>
          Color: {COLOR_OPTIONS.find(o => o.value === selectedColor)?.label}
        </Text>
        <Text style={styles.selectionText}>
          Size: {SIZE_OPTIONS.find(o => o.value === selectedSize)?.label}
        </Text>
      </View>

      <AnimatedButton
        title="Show Selection"
        variant="pulse"
        onPress={handleShowSelection}
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
  picker: {
    backgroundColor: '#ccc',
  },
  selectionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});
