import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ExampleItem = {
  name: keyof RootStackParamList;
  title: string;
  description: string;
};

const examples: ExampleItem[] = [
  {
    name: 'DynamicForm',
    title: 'Dynamic Form',
    description: 'Add/remove form sections dynamically',
  },
  {
    name: 'BasicForm',
    title: 'Basic Form',
    description: 'Simple form with basic inputs',
  },
  {
    name: 'FullForm',
    title: 'Full Form',
    description: 'Complete form with all input types',
  },
  { name: 'Layout', title: 'Layout', description: 'SwiftUI layout examples' },
  {
    name: 'SFSymbol',
    title: 'SF Symbols',
    description: 'SF Symbol icons showcase',
  },
  {
    name: 'StandalonePicker',
    title: 'Standalone Picker',
    description: 'Picker without form context',
  },
  {
    name: 'StandaloneSheet',
    title: 'Standalone Sheet',
    description: 'Sheet presentation',
  },
  {
    name: 'StandaloneSheetPicker',
    title: 'Sheet Picker',
    description: 'Picker in a sheet',
  },
  {
    name: 'ReactHookForm',
    title: 'React Hook Form',
    description: 'Integration with react-hook-form',
  },
  {
    name: 'TanStackForm',
    title: 'TanStack Form',
    description: 'Integration with TanStack Form',
  },
  {
    name: 'TextFieldValidation',
    title: 'TextField Validation',
    description: 'Error states and helper text',
  },
  {
    name: 'EdgeCases',
    title: 'Edge Cases',
    description: 'NumberField clamping, inverted bounds, zero step',
  },
];

export function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map(example => (
        <TouchableOpacity
          key={example.name}
          style={styles.item}
          onPress={() => navigation.navigate(example.name)}
        >
          <Text style={styles.title}>{example.title}</Text>
          <Text style={styles.description}>{example.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
