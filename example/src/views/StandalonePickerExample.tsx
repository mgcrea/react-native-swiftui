import {
  SwiftUIPicker,
  type NativePickerProps,
} from '@mgcrea/react-native-swiftui/src';
import { useState, type FunctionComponent } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedButton } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

type PickerStyle = NonNullable<NativePickerProps['pickerStyle']>;

export const StandalonePickerExample: FunctionComponent = () => {
  const [pickerStyle, setPickerStyle] = useState<PickerStyle>('default');
  const [selectedFruit, setSelectedFruit] = useState<string>('Apple');
  const [selectedColor, setSelectedColor] = useState<string>('Red');
  const [selectedSize, setSelectedSize] = useState<string>('Medium');

  const handleShowSelection = () => {
    const data = {
      pickerStyle,
      selectedFruit,
      selectedColor,
      selectedSize,
    };
    Alert.alert('Current Selection', JSON.stringify(data, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>StandalonePickerExample</Text>
        <Text style={styles.subtitle}>Using SwiftUIPicker directly</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Picker Style</Text>
          <SwiftUIPicker
            label="Style"
            labelColor="#0f62fe"
            selection={pickerStyle}
            options={['default', 'inline', 'menu', 'segmented', 'wheel']}
            pickerStyle="segmented"
            onNativeChange={event =>
              setPickerStyle(event.nativeEvent.value as typeof pickerStyle)
            }
            style={styles.picker}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Favorite Fruit</Text>
          <SwiftUIPicker
            label="Select a fruit"
            labelColor="#d97706"
            selection={selectedFruit}
            options={['Apple', 'Banana', 'Orange', 'Grape', 'Mango']}
            pickerStyle={pickerStyle}
            onNativeChange={event => setSelectedFruit(event.nativeEvent.value)}
            style={styles.picker}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Favorite Color</Text>
          <SwiftUIPicker
            label="Select a color"
            labelColor="#2563eb"
            selection={selectedColor}
            options={['Red', 'Blue', 'Green', 'Yellow', 'Purple']}
            pickerStyle={pickerStyle}
            onNativeChange={event => setSelectedColor(event.nativeEvent.value)}
            style={styles.picker}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferred Size</Text>
          <SwiftUIPicker
            label="Select a size"
            labelColor="#16a34a"
            selection={selectedSize}
            options={['Small', 'Medium', 'Large', 'Extra Large']}
            pickerStyle={pickerStyle}
            onNativeChange={event => setSelectedSize(event.nativeEvent.value)}
            style={styles.picker}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Current Selections</Text>
          <Text style={styles.selectionText}>Fruit: {selectedFruit}</Text>
          <Text style={styles.selectionText}>Color: {selectedColor}</Text>
          <Text style={styles.selectionText}>Size: {selectedSize}</Text>
        </View>
      </ScrollView>

      <AnimatedButton
        title="Show Selection"
        variant="pulse"
        onPress={handleShowSelection}
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
  picker: {
    // width: '100%',
    backgroundColor: '#ccc',
  },
  selectionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
});
