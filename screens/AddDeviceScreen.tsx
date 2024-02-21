import {
  ActivityIndicator,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BleManager from 'react-native-ble-manager';
import {useEffect, useState} from 'react';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const AddDeviceScreen = props => {
  const {navigation} = props;
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      {permissionsEnabled ? (
        <DeviceSearchPage />
      ) : (
        <LocationPermissionPage onNext={() => setPermissionsEnabled(true)} />
      )}
    </SafeAreaView>
  );
};

const DeviceSearchPage = props => {
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState<boolean>(false);

  async function handleScanResult() {
    const discoveredPeripherals = await BleManager.getDiscoveredPeripherals();
    if (discoveredPeripherals.length === 0) {
      console.log('No bluetooth devices found');
    } else {
      for (let i = 0; i < discoveredPeripherals.length; i++) {
        let peripheral = discoveredPeripherals[i];
        peripherals.set(peripheral.id, peripheral);
      }
      console.log(Array.from(peripherals.values()));
      const buffer = Buffer.from(
        '{"assets":[{"ticker":"BTC-USD","name":"BTC"},{"ticker":"^GSPC", "name":"S&P 500"}], "candles":true}',
      );
      try {
        await BleManager.connect('73a6e416-1fbd-8167-accd-6caede81b488');
      } catch (error) {
        console.log(error);
      }
      const peripheralInfo = await BleManager.retrieveServices(
        '73a6e416-1fbd-8167-accd-6caede81b488',
      );
      console.log(peripheralInfo);
      const value = await BleManager.write(
        '73a6e416-1fbd-8167-accd-6caede81b488',
        'A07498CA-AD5B-474E-940D-16F1FBE7E8CD',
        '664161df-1bae-4003-968f-5b5a6713cde4',
        buffer.toJSON().data,
        200,
      );
      console.log('written');
      // setDevices(Array.from(peripherals.values()));
    }
  }

  async function initialiseBleManager() {
    BleManagerEmitter.addListener('BleManagerStopScan', () => {
      setIsScanning(false);
      console.log('Scanning stopped');
      handleScanResult();
    });
    await BleManager.start({showAlert: false});
    console.log('Bluetooth manager initialised');
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

  async function scan() {
    await initialiseBleManager()
    await startScan()
  }
  useEffect(() => {
    scan()
  }, []);
  return (
    <View style={{justifyContent: 'center', flex: 1}}>
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
        <ActivityIndicator size="large" color="#0FA3B1" style={{padding: 10}} />
      </View>
    </View>
  );
};

const LocationPermissionPage = props => {
  const {onNext} = props;

  async function requestPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      await BleManager.enableBluetooth();
      const fineLocationAccess = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (fineLocationAccess) {
        return true;
      } else {
        const fineLocationAccessRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return fineLocationAccessRequest;
      }
    }
    return true;
  }

  async function handleNext() {
    const allowed = await requestPermissions();
    if (allowed) {
      onNext();
    } else {
      console.log('Permissions denied');
    }
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
        <TouchableOpacity
          activeOpacity={0.75}
          style={{padding: 15}}
          onPress={handleNext}>
          <View
            style={{
              backgroundColor: '#0FA3B1',
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 20,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}>
            <Text
              style={{
                padding: 20,
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '500',
                color: 'white',
              }}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddDeviceScreen;
