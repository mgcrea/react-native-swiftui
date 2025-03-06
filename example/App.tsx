import React from 'react';
import {BasicFormExample} from './src/views/BasicFormExample';
import {WorkoutExample} from './src/views/WorkoutExample.private';
import {ReactHookFormExample} from './src/views/ReactHookFormExample';
import {TanStackFormExample} from './src/views/TanStackFormExample';

function App(): React.JSX.Element {
  return <WorkoutExample />;
  // return <BasicFormExample />;
  // return <TanStackFormExample />;
  // return <ReactHookFormExample />;
}

export default App;
