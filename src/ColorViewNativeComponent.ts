import type { HostComponent, ViewProps } from "react-native";
// import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

// type WebViewScriptLoadedEvent = {
//   result: 'success' | 'error';
// };

export interface NativeProps extends ViewProps {
  color?: string;
}

export default codegenNativeComponent<NativeProps>(
  "NativeColorView"
) as HostComponent<NativeProps>;
