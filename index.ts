import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

if (typeof document !== 'undefined') {
	document.documentElement.style.height = '100%';
	document.documentElement.style.overflowY = 'auto';
	document.body.style.minHeight = '100%';
	document.body.style.overflowY = 'auto';
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
