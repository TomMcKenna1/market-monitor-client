import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddDeviceScreen from './screens/AddDeviceScreen';

import BleManager, {Peripheral} from 'react-native-ble-manager';
import Device from './device.js';

const Stack = createNativeStackNavigator();
BleManager.start({showAlert: false});

const App = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  function addDevice(device: Device) {
    setDevices([...devices, device]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" options={{title: 'Home'}}>
          {props => <HomeScreen {...props} devices={devices} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddDevice"
          options={{title: 'Add Device', gestureDirection: 'vertical'}}>
          {props => <AddDeviceScreen {...props} addDevice={addDevice} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type StackParamList = {
  Home: {devices: Device[]};
  AddDevice: undefined;
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

export default App;
