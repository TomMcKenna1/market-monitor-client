import {
  ActivityIndicator,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {useEffect, useState} from 'react';
import TextButton from '../components/TextButton.tsx';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const AddDeviceScreen = props => {
  const {navigation} = props;
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);

  async function checkPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      await BleManager.enableBluetooth();
      setPermissionsEnabled(
        await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ),
      );
    } else {
      setPermissionsEnabled(true);
    }
  }

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {permissionsEnabled ? (
        <DeviceSearchPage navigation={navigation} />
      ) : (
        <LocationPermissionPage onNext={() => setPermissionsEnabled(true)} />
      )}
    </SafeAreaView>
  );
};

interface DeviceSearchPageProps {
  navigation: CallableFunction;
}

const DeviceSearchPage = (props: DeviceSearchPageProps) => {
  const {navigation} = props;

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [discoveredPeripherals, setDiscoveredPeripherals] = useState<
    Peripheral[]
  >([]);

  async function handleScanResult() {
    BleManagerEmitter.removeAllListeners('BleManagerStopScan');

    const _discoveredPeripherals = await BleManager.getDiscoveredPeripherals();
    setDiscoveredPeripherals(
      _discoveredPeripherals.filter(peripheral =>
        peripheral.name?.includes('marketmonitor'),
      ),
    );
  }

  async function startScan() {
    if (!isScanning) {
      try {
        await BleManager.scan([], 5, true);
        console.log('Scanning...');
        setIsScanning(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function findDevices() {
    BleManagerEmitter.addListener('BleManagerStopScan', () => {
      setIsScanning(false);
      console.log('Scanning stopped');
      handleScanResult();
    });
    await startScan();
  }

  useEffect(() => {
    findDevices();
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
          {discoveredPeripherals.map(peripheral => (
            <TextButton
              text='3.4" Market Monitor'
              onPress={() => {
                navigation.navigate('InitDevice', {
                  peripheral: peripheral,
                });
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
            onPress={findDevices}
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
