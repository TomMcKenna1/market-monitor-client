import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const peripherals = new Map();
  const [devices, setDevices] = useState<any[]>([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function requestPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      await BleManager.enableBluetooth();
      const fineLocationAccess = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (fineLocationAccess) {
        console.log('Fine location access already enabled');
      } 
      else {
        const fineLocationAccessRequest = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (fineLocationAccessRequest) {
          console.log('Fine location access allowed');
        } 
        else {
          console.log('Fine location access refused');
        }
      }
    }
  }

  async function handleScanResult() {
    const discoveredPeripherals = await BleManager.getDiscoveredPeripherals();
    if (discoveredPeripherals.length === 0) {
      console.log('No bluetooth devices found')
    }
    else {
      for (let i = 0; i < discoveredPeripherals.length; i++) {
        let peripheral = discoveredPeripherals[i];
        peripherals.set(peripheral.id, peripheral);
      }
      console.log(Array.from(peripherals.values()))
      // setDevices(Array.from(peripherals.values()));
    }
  }

  async function initialiseBleManager() {
    BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scanning stopped');
        handleScanResult();
      }
    )
    await BleManager.start({showAlert: false});
    console.log('Bluetooth manager initialised')
  }

  async function startScan() {
    if (!isScanning) {
      try {
        await BleManager.scan([], 5, true);
        console.log('Scanning...');
        setIsScanning(true);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    requestPermissions();
    initialiseBleManager();
  }, [])

  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginBottom: 40,
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                color: isDarkMode ? Colors.white : Colors.black,
              }}>
              React Native BLE Manager Tutorial
            </Text>
          </View>
          <TouchableOpacity 
            activeOpacity={0.5} 
            style={styles.buttonStyle}
            onPress={startScan}
          >
            <Text style={styles.buttonTextStyle}>
              {isScanning ? 'Scanning...' : 'Scan for MarketMonitor devices'}
            </Text>
            {devices.length > 0 ? (
              <FlatList
                data={devices}
                renderItem={({item}) => <Text style={styles.buttonTextStyle}>{item.name}:{item.rssi}</Text>}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text style={styles.buttonTextStyle}>No connected devices</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
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
export default App;
