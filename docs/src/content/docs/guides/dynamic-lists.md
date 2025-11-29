---
title: Dynamic Lists
description: Creating dynamic form lists with add and remove functionality
---

This guide covers how to build dynamic form lists where users can add and remove items.

## Basic Pattern

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert } from 'react-native';

type Item = {
  id: string;
  name: string;
};

export function DynamicList() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Item 1' },
  ]);

  const addItem = () => {
    const newId = String(Date.now());
    setItems([...items, { id: newId, name: '' }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, name: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, name } : item
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          {items.map((item, index) => (
            <SwiftUI.Section key={item.id} header={`Item ${index + 1}`}>
              <SwiftUI.TextField
                label="Name"
                text={item.name}
                onChange={(value) => updateItem(item.id, value)}
              />
              {items.length > 1 && (
                <SwiftUI.Button
                  title="Remove"
                  style={{ color: 'red' }}
                  onPress={() => removeItem(item.id)}
                />
              )}
            </SwiftUI.Section>
          ))}

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Add Item"
              onPress={addItem}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## Complex Item Type

```tsx
type Person = {
  id: string;
  name: string;
  email: string;
  age: number;
  birthDate: Date;
  gender: string;
};

const createPerson = (): Person => ({
  id: String(Date.now()),
  name: '',
  email: '',
  age: 25,
  birthDate: new Date(),
  gender: 'prefer_not_to_say',
});

export function PeopleForm() {
  const [people, setPeople] = useState<Person[]>([createPerson()]);

  const addPerson = () => {
    setPeople([...people, createPerson()]);
  };

  const removePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
  };

  const updatePerson = <K extends keyof Person>(
    id: string,
    field: K,
    value: Person[K]
  ) => {
    setPeople(people.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.Form>
          {people.map((person, index) => (
            <SwiftUI.Section key={person.id} header={`Person ${index + 1}`}>
              <SwiftUI.TextField
                label="Name"
                text={person.name}
                onChange={(v) => updatePerson(person.id, 'name', v)}
              />
              <SwiftUI.TextField
                label="Email"
                keyboardType="emailAddress"
                text={person.email}
                onChange={(v) => updatePerson(person.id, 'email', v)}
              />
              <SwiftUI.Stepper
                label={`Age: ${person.age}`}
                value={person.age}
                minimum={0}
                maximum={120}
                onChange={(v) => updatePerson(person.id, 'age', v)}
              />
              <SwiftUI.DatePicker
                label="Birth Date"
                selection={person.birthDate}
                displayedComponents="date"
                onChange={(v) => updatePerson(person.id, 'birthDate', v)}
              />
              <SwiftUI.Picker
                label="Gender"
                selection={person.gender}
                options={['Male', 'Female', 'Other', 'Prefer not to say']}
                onChange={(v) => updatePerson(person.id, 'gender', v)}
              />
              {people.length > 1 && (
                <SwiftUI.Button
                  title="Remove Person"
                  style={{ color: 'red' }}
                  onPress={() => removePerson(person.id)}
                />
              )}
            </SwiftUI.Section>
          ))}

          <SwiftUI.Section>
            <SwiftUI.Button
              title="Add Person"
              onPress={addPerson}
            />
            <SwiftUI.Button
              title="Submit All"
              buttonStyle="borderedProminent"
              onPress={() => Alert.alert('Data', JSON.stringify(people, null, 2))}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </View>
  );
}
```

## With ScrollView

For forms that might exceed screen height:

```tsx
import { ScrollView } from 'react-native';

export function LongDynamicForm() {
  const [items, setItems] = useState([...]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <SwiftUI style={{ minHeight: 800 }}>
        <SwiftUI.Form scrollDisabled>
          {items.map((item, index) => (
            <SwiftUI.Section key={item.id}>
              {/* Fields */}
            </SwiftUI.Section>
          ))}
        </SwiftUI.Form>
      </SwiftUI>
    </ScrollView>
  );
}
```

:::note
When embedding the form in a ScrollView, use `scrollDisabled` on the Form and set a `minHeight` on the SwiftUI container.
:::

## Reordering Items

```tsx
const moveItem = (id: string, direction: 'up' | 'down') => {
  const index = items.findIndex(item => item.id === id);
  if (
    (direction === 'up' && index === 0) ||
    (direction === 'down' && index === items.length - 1)
  ) {
    return;
  }

  const newItems = [...items];
  const swapIndex = direction === 'up' ? index - 1 : index + 1;
  [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
  setItems(newItems);
};

// In render:
<SwiftUI.HStack spacing={8}>
  <SwiftUI.Button
    title="↑"
    disabled={index === 0}
    onPress={() => moveItem(item.id, 'up')}
  />
  <SwiftUI.Button
    title="↓"
    disabled={index === items.length - 1}
    onPress={() => moveItem(item.id, 'down')}
  />
</SwiftUI.HStack>
```

## Validation

```tsx
const validateItems = () => {
  const errors: string[] = [];

  items.forEach((item, index) => {
    if (!item.name.trim()) {
      errors.push(`Item ${index + 1}: Name is required`);
    }
    if (!item.email.includes('@')) {
      errors.push(`Item ${index + 1}: Valid email required`);
    }
  });

  return errors;
};

const handleSubmit = () => {
  const errors = validateItems();
  if (errors.length > 0) {
    Alert.alert('Validation Error', errors.join('\n'));
    return;
  }

  // Submit data
  console.log('Submitting:', items);
};
```

## Complete Example: Survey Builder

```tsx
type Question = {
  id: string;
  question: string;
  type: 'text' | 'number' | 'boolean';
  required: boolean;
};

export function SurveyBuilder() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', question: '', type: 'text', required: true },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: String(Date.now()), question: '', type: 'text', required: false },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = <K extends keyof Question>(
    id: string,
    field: K,
    value: Question[K]
  ) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <SwiftUI style={{ flex: 1 }}>
        <SwiftUI.VStack>
          <SwiftUI.Text text="Survey Builder" style={{ font: 'largeTitle' }} />
          <SwiftUI.Form>
            {questions.map((q, index) => (
              <SwiftUI.Section key={q.id} header={`Question ${index + 1}`}>
                <SwiftUI.TextField
                  label="Question"
                  placeholder="Enter your question"
                  text={q.question}
                  onChange={(v) => updateQuestion(q.id, 'question', v)}
                />
                <SwiftUI.Picker
                  label="Answer Type"
                  selection={q.type}
                  options={[
                    { value: 'text', label: 'Text' },
                    { value: 'number', label: 'Number' },
                    { value: 'boolean', label: 'Yes/No' },
                  ]}
                  pickerStyle="segmented"
                  onChange={(v) => updateQuestion(q.id, 'type', v as Question['type'])}
                />
                <SwiftUI.Toggle
                  label="Required"
                  isOn={q.required}
                  onChange={(v) => updateQuestion(q.id, 'required', v)}
                />
                {questions.length > 1 && (
                  <SwiftUI.Button
                    title="Remove Question"
                    style={{ color: 'red' }}
                    onPress={() => removeQuestion(q.id)}
                  />
                )}
              </SwiftUI.Section>
            ))}

            <SwiftUI.Section>
              <SwiftUI.Button
                title="Add Question"
                onPress={addQuestion}
              />
              <SwiftUI.Button
                title="Save Survey"
                buttonStyle="borderedProminent"
                onPress={() => console.log('Survey:', questions)}
              />
            </SwiftUI.Section>
          </SwiftUI.Form>
        </SwiftUI.VStack>
      </SwiftUI>
    </View>
  );
}
```

## Tips

1. **Always use unique keys** - Use stable IDs, not array indices
2. **Minimum item count** - Consider keeping at least one item
3. **Type-safe updates** - Use generics for type-safe field updates
4. **ScrollView wrapper** - Use for potentially long lists
5. **Validation** - Validate all items before submission
6. **Confirm deletion** - Consider confirmation for destructive actions
