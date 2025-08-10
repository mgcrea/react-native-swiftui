import React from 'react';
import { BasicFormExample } from './src/views/BasicFormExample';
import { DynamicFormExample } from './src/views/DynamicFormExample';
import { FullFormExample } from './src/views/FullFormExample';
import { LayoutExample } from './src/views/LayoutExample';
import { WorkoutExample } from './src/views/WorkoutExample.private';
import { ReactHookFormExample } from './src/views/ReactHookFormExample';
import { TanStackFormExample } from './src/views/TanStackFormExample';
import { AdvancedFormExample } from './src/views/AdvancedFormExample.private';
import { ReanimatedConflictTest } from './src/views/ReanimatedConflictTest';

function App(): React.JSX.Element {
  // Switch between these to test different scenarios:
  // return <BasicFormExample />; // Basic form with picker issue test
  // return <TanStackFormExample />;           // Original working example
  return <DynamicFormExample />; // Dynamic form test
}

export default App;
