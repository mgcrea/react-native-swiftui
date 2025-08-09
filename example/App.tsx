import React from 'react';
import { BasicFormExample } from './src/views/BasicFormExample';
import { FullFormExample } from './src/views/FullFormExample';
import { LayoutExample } from './src/views/LayoutExample';
import { WorkoutExample } from './src/views/WorkoutExample.private';
import { ReactHookFormExample } from './src/views/ReactHookFormExample';
import { TanStackFormExample } from './src/views/TanStackFormExample';
import { AdvancedFormExample } from './src/views/AdvancedFormExample.private';

function App(): React.JSX.Element {
  return <ReactHookFormExample />;
}

export default App;
