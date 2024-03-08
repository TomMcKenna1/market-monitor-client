import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddDeviceScreen from './screens/AddDeviceScreen';

import Device from './device.js';
import EditDeviceScreen from './screens/EditDeviceScreen';

import { BleManager } from 'react-native-ble-plx'

export const bleManager = new BleManager()

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="EditDevice" options={{title: 'Edit Device'}} component={EditDeviceScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type StackParamList = {
  Home: {devices: Device[]};
  AddDevice: undefined;
  EditDevice: {device: Device};
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;

export default App;
