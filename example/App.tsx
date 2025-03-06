import React from 'react';
import {BasicExample} from './src/views/BasicExample';
import {ReactHookFormExample} from './src/views/ReactHookFormExample';
import {TanStackFormExample} from './src/views/TanStackFormExample';

function App(): React.JSX.Element {
  // return <TanStackFormExample />;
  // return <ReactHookFormExample />;
  return <BasicExample />;
}

export default App;
