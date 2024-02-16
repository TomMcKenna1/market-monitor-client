import {useEffect, useState} from 'react';
import {
  Dimensions,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import IconButton from '../components/IconButton.tsx';
import DeviceButton from '../components/DeviceButton.tsx';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const HomeScreen = (props) => {
  const {navigation} = props
  const isDarkMode = useColorScheme() === 'dark';
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [devices, setDevices] = useState<any[]>([]);

  const peripherals = new Map();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#131515' : '#FFFAFB',
  };

  async function requestPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      await BleManager.enableBluetooth();
      const fineLocationAccess = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (fineLocationAccess) {
        console.log('Fine location access already enabled');
      } else {
        const fineLocationAccessRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (fineLocationAccessRequest) {
          console.log('Fine location access allowed');
        } else {
          console.log('Fine location access refused');
        }
      }
    }
  }

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

  useEffect(() => {
    requestPermissions();
    initialiseBleManager();
  }, []);
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{flex: 1}}>
        <ScrollView
          style={backgroundStyle}
          contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              marginBottom: 40,
            }}>
            <DeviceButton title="Home - Study" deviceName="3.4in Market Monitor"/>
            <DeviceButton title="Office - Desk" deviceName="3.4in Market Monitor"/>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: 15,
            zIndex: 1,
          }}>
          <IconButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              backgroundColor: '#0FA3B1',
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
              borderRadius: 20,
            }}
            iconColor={isDarkMode ? '#2B2C28' : '#FFFAFB'}
            loading={false}
            onPress={() => navigation.navigate("AddDevice")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
