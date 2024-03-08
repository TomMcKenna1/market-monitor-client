import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useEffect, useState} from 'react';
import TextButton from '../components/TextButton.tsx';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../App.tsx';
import {Device} from 'react-native-ble-plx';
import _Device from '../device.js';
import {bleManager} from '../App.tsx';

interface AddDeviceScreenProps {
  addDevice: CallableFunction;
}

const AddDeviceScreen = (props: AddDeviceScreenProps) => {
  const {addDevice} = props;
  const navigation = useNavigation<NavigationProps>();

  const [permissionsEnabled, setPermissionsEnabled] = useState(true);

  function registerPeripheral(device: Device) {
    const _device = new _Device(
      'test',
      '3.4" Market Monitor',
      false,
      device,
    );
    addDevice(_device);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {permissionsEnabled ? (
        <DeviceSearchPage
          navigation={navigation}
          onRegisterPeripheral={registerPeripheral}
        />
      ) : (
        <LocationPermissionPage onNext={() => setPermissionsEnabled(true)} />
      )}
    </SafeAreaView>
  );
};

interface DeviceSearchPageProps {
  navigation: NavigationProps;
  onRegisterPeripheral: CallableFunction;
}

const DeviceSearchPage = (props: DeviceSearchPageProps) => {
  const {navigation, onRegisterPeripheral} = props;

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [discoveredPeripherals, setDiscoveredPeripherals] = useState<Device[]>(
    [],
  );

  function startScan() {
    setIsScanning(true);
    bleManager.startDeviceScan(null, null, (error, device: Device | null) => {
      if (error) {
        console.log(error);
        return;
      }
      if (device && device.name && device.name.includes('marketmonitor')) {
        setDiscoveredPeripherals([...discoveredPeripherals, device]);
        bleManager.stopDeviceScan();
        setIsScanning(false);
      }
    });
  }

  useEffect(() => {
    startScan();
  }, []);

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      {isScanning ? (
        <>
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
              }}>
              Looking for devices
            </Text>
          </View>
          <View style={{flex: 1}}>
            <ActivityIndicator
              size="large"
              color="#0FA3B1"
              style={{padding: 10}}
            />
          </View>
        </>
      ) : discoveredPeripherals.length > 0 ? (
        <>
          {discoveredPeripherals.map(device => (
            <TextButton
              text='3.4" Market Monitor'
              onPress={() => {
                onRegisterPeripheral(device);
              }}
            />
          ))}
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              padding: 20,
              fontSize: 30,
            }}>
            No devices found
          </Text>
          <TextButton
            style={{width: '30%'}}
            text="Retry"
            onPress={startScan}
          />
        </View>
      )}
    </View>
  );
};

interface LocationPermissionPageProps {
  onNext: CallableFunction;
}

const LocationPermissionPage = (props: LocationPermissionPageProps) => {
  const {onNext} = props;

  async function handleNext() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const fineLocationAccessRequest = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!fineLocationAccessRequest) {
        console.log('Permissions denied');
        return;
      }
    }
    onNext();
  }

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>Location access</Text>
        <Text style={{padding: 20, textAlign: 'center', fontSize: 17}}>
          Location access is needed to detect nearby Bluetooth and Wi-Fi
          signals, and to communicate with your Market Monitor device.
        </Text>
        <Text style={{padding: 20, textAlign: 'center', fontSize: 17}}>
          Tap next to enable precise location.
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Icon color="#0FA3B1" name="map-location-dot" size={150} />
      </View>
      <View style={{padding: 20, alignItems: 'flex-end'}}>
        <TextButton text="Next" onPress={handleNext} />
      </View>
    </View>
  );
};
export default AddDeviceScreen;
