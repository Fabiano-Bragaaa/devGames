import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, Text, View} from 'react-native';

import {Routes} from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={'#050B18'} />
      <Routes />
    </NavigationContainer>
  );
}
