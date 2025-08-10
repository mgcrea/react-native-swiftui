import { SwiftUI } from '@mgcrea/react-native-swiftui/src';
import { useState, type FunctionComponent } from 'react';
import { Alert, ScrollView, View } from 'react-native';

type Person = {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  birthDate: Date;
  age: number;
};

export const DynamicFormExample: FunctionComponent = () => {
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
    console.warn({ people });
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

  const updatePerson = (id: string, field: keyof Person, value: any) => {
    setPeople(people.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSubmit = () => {
    const data = {
      people,
      count: people.length,
    };
    Alert.alert('Form Data', JSON.stringify(data, null, 2));
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <SwiftUI style={{ minHeight: 800 }}>
        <SwiftUI.VStack>
          <SwiftUI.Text text="Dynamic Form Example" />
          <SwiftUI.Form>
            {people.map((person, index) => (
              <SwiftUI.Section key={person.id} header={`Person ${index + 1}`}>
                <SwiftUI.TextField
                  placeholder="Name"
                  text={person.name}
                  onChange={value => updatePerson(person.id, 'name', value)}
                />

                <SwiftUI.Picker
                  options={['Male', 'Female', 'Other']}
                  label="Gender"
                  selection={person.gender}
                  onChange={value => updatePerson(person.id, 'gender', value)}
                />
                <SwiftUI.DatePicker
                  label="Birth date"
                  selection={person.birthDate}
                  onChange={value =>
                    updatePerson(person.id, 'birthDate', value)
                  }
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
        </SwiftUI.VStack>
      </SwiftUI>
    </ScrollView>
  );
};
