import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import IconButton from '../components/IconButton.tsx';
import DeviceButton from '../components/DeviceButton.tsx';

import Device from '../device.js';

const HomeScreen = props => {
  const {navigation, devices} = props;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#131515' : '#FFFAFB',
  };

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
            {devices.length > 0 ? (
              devices.map((device: Device) => <DeviceButton device={device} />)
            ) : (
              <Text
                style={{
                  padding: 100,
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'lightgray',
                }}>
                No devices
              </Text>
            )}
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
            onPress={() => navigation.navigate('AddDevice')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
