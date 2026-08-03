import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { useState } from 'react';
import { Alert } from 'react-native';
import { ScreenContainer } from '../components';

type Person = {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  birthDate: Date;
  age: number;
};

export function DynamicFormScreen() {
  const [people, setPeople] = useState<Person[]>([
    {
      id: '1',
      name: 'John Doe',
      gender: 'Male',
      age: 25,
      birthDate: new Date('1998-01-01'),
    },
  ]);

  const addPerson = () => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: '',
      gender: 'Male',
      age: 18,
      birthDate: new Date(),
    };
    setPeople([...people, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
  };

  const updatePerson = (id: string, field: keyof Person, value: unknown) => {
    setPeople(people.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSubmit = () => {
    const data = { people, count: people.length };
    Alert.alert('Form Data', JSON.stringify(data, null, 2));
  };

  return (
    <ScreenContainer scrollable contentContainerStyle={{ minHeight: 800 }}>
      <SwiftUI style={{ minHeight: 800 }}>
        <SwiftUI.Form>
          {people.map((person, index) => (
            <SwiftUI.Section key={person.id} header={`Person ${index + 1}`}>
              <SwiftUI.TextField
                placeholder="Name"
                text={person.name}
                onChange={value => updatePerson(person.id, 'name', value)}
              />
              <SwiftUI.Picker
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' },
                ]}
                label="Gender"
                selection={person.gender}
                onChange={value => updatePerson(person.id, 'gender', value)}
              />
              <SwiftUI.DatePicker
                label="Birth date"
                selection={person.birthDate}
                onChange={value => updatePerson(person.id, 'birthDate', value)}
                displayedComponents="date"
              />
              <SwiftUI.Stepper
                label={`Age ${person.age}`}
                value={person.age}
                minimum={0}
                maximum={120}
                onChange={value => updatePerson(person.id, 'age', value)}
              />
              {people.length > 1 && (
                <SwiftUI.Button
                  title="Remove Person"
                  onPress={() => removePerson(person.id)}
                />
              )}
            </SwiftUI.Section>
          ))}
          <SwiftUI.Section>
            <SwiftUI.Button title="Add Person" onPress={addPerson} />
            <SwiftUI.Button title="Submit All" onPress={handleSubmit} />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </ScreenContainer>
  );
}
