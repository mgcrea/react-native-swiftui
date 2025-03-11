import React from 'react';
import {BasicFormExample} from './src/views/BasicFormExample';
import {FullFormExample} from './src/views/FullFormExample';
import {WorkoutExample} from './src/views/WorkoutExample.private';
import {AdvancedFormExample} from './src/views/AdvancedFormExample.private';
import {ReactHookFormExample} from './src/views/ReactHookFormExample';
import {TanStackFormExample} from './src/views/TanStackFormExample';

function App(): React.JSX.Element {
  return <BasicFormExample />;
  // return <WorkoutExample />;
  // return <AdvancedFormExample />;
  // return <TanStackFormExample />;
  // return <ReactHookFormExample />;
}

export default App;
