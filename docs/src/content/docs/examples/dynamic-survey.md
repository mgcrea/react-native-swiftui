---
title: Dynamic Survey
description: Dynamic form with add/remove items
---

This example demonstrates a survey form where users can dynamically add and remove questions.

```tsx
import { SwiftUI } from '@mgcrea/react-native-swiftui';
import { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';

type QuestionType = 'text' | 'number' | 'boolean' | 'choice';

type Question = {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[]; // For choice type
};

type Response = {
  questionId: string;
  value: string | number | boolean;
};

export function DynamicSurveyExample() {
  // Survey configuration
  const [title, setTitle] = useState('Customer Feedback');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: 'How satisfied are you?', type: 'choice', required: true, options: ['Very', 'Somewhat', 'Not at all'] },
  ]);

  // New question state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<QuestionType>('text');
  const [newQuestionRequired, setNewQuestionRequired] = useState(false);
  const [newQuestionOptions, setNewQuestionOptions] = useState('');

  // Preview mode
  const [isPreview, setIsPreview] = useState(false);
  const [responses, setResponses] = useState<Record<string, string | number | boolean>>({});

  const addQuestion = () => {
    if (!newQuestionText.trim()) {
      Alert.alert('Error', 'Question text is required');
      return;
    }

    const options = newQuestionType === 'choice'
      ? newQuestionOptions.split(',').map(o => o.trim()).filter(Boolean)
      : undefined;

    if (newQuestionType === 'choice' && (!options || options.length < 2)) {
      Alert.alert('Error', 'Choice questions need at least 2 options');
      return;
    }

    const newQuestion: Question = {
      id: String(Date.now()),
      text: newQuestionText,
      type: newQuestionType,
      required: newQuestionRequired,
      options,
    };

    setQuestions([...questions, newQuestion]);
    setNewQuestionText('');
    setNewQuestionType('text');
    setNewQuestionRequired(false);
    setNewQuestionOptions('');
  };

  const removeQuestion = (id: string) => {
    if (questions.length === 1) {
      Alert.alert('Error', 'Survey must have at least one question');
      return;
    }
    setQuestions(questions.filter(q => q.id !== id));
  };

  const moveQuestion = (id: string, direction: 'up' | 'down') => {
    const index = questions.findIndex(q => q.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[swapIndex]] = [newQuestions[swapIndex], newQuestions[index]];
    setQuestions(newQuestions);
  };

  const handleSubmitSurvey = () => {
    // Validate required questions
    const missingRequired = questions
      .filter(q => q.required && !responses[q.id])
      .map(q => q.text);

    if (missingRequired.length > 0) {
      Alert.alert('Required Questions', `Please answer:\n${missingRequired.join('\n')}`);
      return;
    }

    Alert.alert('Survey Submitted', JSON.stringify(responses, null, 2));
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <SwiftUI.TextField
            label={question.text + (question.required ? ' *' : '')}
            text={String(responses[question.id] ?? '')}
            onChange={(value) => setResponses({ ...responses, [question.id]: value })}
          />
        );
      case 'number':
        return (
          <SwiftUI.NumberField
            label={question.text + (question.required ? ' *' : '')}
            value={responses[question.id] as number ?? null}
            onChange={(value) => setResponses({ ...responses, [question.id]: value ?? 0 })}
          />
        );
      case 'boolean':
        return (
          <SwiftUI.Toggle
            label={question.text + (question.required ? ' *' : '')}
            isOn={Boolean(responses[question.id])}
            onChange={(value) => setResponses({ ...responses, [question.id]: value })}
          />
        );
      case 'choice':
        return (
          <SwiftUI.Picker
            label={question.text + (question.required ? ' *' : '')}
            selection={String(responses[question.id] ?? '')}
            options={question.options ?? []}
            onChange={(value) => setResponses({ ...responses, [question.id]: value })}
          />
        );
    }
  };

  if (isPreview) {
    return (
      <View style={{ flex: 1 }}>
        <SwiftUI style={{ flex: 1 }}>
          <SwiftUI.Form>
            <SwiftUI.Section>
              <SwiftUI.Text text={title} style={{ font: 'title', fontWeight: 'bold' }} />
              {description && <SwiftUI.Text text={description} style={{ color: '#666' }} />}
            </SwiftUI.Section>

            {questions.map((question, index) => (
              <SwiftUI.Section key={question.id} header={`Question ${index + 1}`}>
                {renderQuestionPreview(question)}
              </SwiftUI.Section>
            ))}

            <SwiftUI.Section>
              <SwiftUI.Button
                title="Submit Survey"
                buttonStyle="borderedProminent"
                onPress={handleSubmitSurvey}
              />
              <SwiftUI.Button
                title="Back to Editor"
                onPress={() => setIsPreview(false)}
              />
            </SwiftUI.Section>
          </SwiftUI.Form>
        </SwiftUI>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <SwiftUI style={{ minHeight: 1000 }}>
        <SwiftUI.Form scrollDisabled>
          {/* Survey Info */}
          <SwiftUI.Section header="Survey Details">
            <SwiftUI.TextField
              label="Title"
              placeholder="Survey Title"
              text={title}
              onChange={setTitle}
            />
            <SwiftUI.TextField
              label="Description"
              placeholder="Optional description"
              text={description}
              onChange={setDescription}
              multiline
            />
          </SwiftUI.Section>

          {/* Existing Questions */}
          {questions.map((question, index) => (
            <SwiftUI.Section key={question.id} header={`Question ${index + 1}`}>
              <SwiftUI.Text text={question.text} style={{ font: 'body' }} />
              <SwiftUI.HStack>
                <SwiftUI.Text text={`Type: ${question.type}`} style={{ color: '#666', fontSize: 14 }} />
                <SwiftUI.Spacer />
                <SwiftUI.Text
                  text={question.required ? 'Required' : 'Optional'}
                  style={{ color: question.required ? '#FF3B30' : '#34C759', fontSize: 14 }}
                />
              </SwiftUI.HStack>
              {question.options && (
                <SwiftUI.Text
                  text={`Options: ${question.options.join(', ')}`}
                  style={{ color: '#666', fontSize: 12 }}
                />
              )}
              <SwiftUI.HStack spacing={8}>
                <SwiftUI.Button
                  title="↑"
                  disabled={index === 0}
                  onPress={() => moveQuestion(question.id, 'up')}
                />
                <SwiftUI.Button
                  title="↓"
                  disabled={index === questions.length - 1}
                  onPress={() => moveQuestion(question.id, 'down')}
                />
                <SwiftUI.Spacer />
                <SwiftUI.Button
                  title="Remove"
                  style={{ color: 'red' }}
                  onPress={() => removeQuestion(question.id)}
                />
              </SwiftUI.HStack>
            </SwiftUI.Section>
          ))}

          {/* Add New Question */}
          <SwiftUI.Section header="Add New Question">
            <SwiftUI.TextField
              label="Question Text"
              placeholder="Enter your question"
              text={newQuestionText}
              onChange={setNewQuestionText}
            />
            <SwiftUI.Picker
              label="Question Type"
              selection={newQuestionType}
              options={[
                { value: 'text', label: 'Text' },
                { value: 'number', label: 'Number' },
                { value: 'boolean', label: 'Yes/No' },
                { value: 'choice', label: 'Multiple Choice' },
              ]}
              pickerStyle="segmented"
              onChange={(value) => setNewQuestionType(value as QuestionType)}
            />
            {newQuestionType === 'choice' && (
              <SwiftUI.TextField
                label="Options"
                placeholder="Option 1, Option 2, Option 3"
                text={newQuestionOptions}
                onChange={setNewQuestionOptions}
              />
            )}
            <SwiftUI.Toggle
              label="Required"
              isOn={newQuestionRequired}
              onChange={setNewQuestionRequired}
            />
            <SwiftUI.Button
              title="Add Question"
              buttonStyle="bordered"
              onPress={addQuestion}
            />
          </SwiftUI.Section>

          {/* Actions */}
          <SwiftUI.Section>
            <SwiftUI.Button
              title="Preview Survey"
              buttonStyle="borderedProminent"
              onPress={() => {
                setResponses({});
                setIsPreview(true);
              }}
            />
            <SwiftUI.Button
              title="Save Survey"
              onPress={() => Alert.alert('Saved', `Survey with ${questions.length} questions`)}
            />
          </SwiftUI.Section>
        </SwiftUI.Form>
      </SwiftUI>
    </ScrollView>
  );
}
```

## Key Features

- **Dynamic question list** with add/remove
- **Multiple question types** (text, number, boolean, choice)
- **Question reordering** with up/down buttons
- **Preview mode** to test the survey
- **Required field validation**
- **Choice questions** with comma-separated options
- **Survey metadata** (title, description)
- **ScrollView wrapper** for long forms
