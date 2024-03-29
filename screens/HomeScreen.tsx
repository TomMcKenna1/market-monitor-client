import {
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
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../App.tsx';

interface HomeScreenProps {
  devices: Device[];
}

const HomeScreen = (props: HomeScreenProps) => {
  const {devices} = props;

  const navigation = useNavigation<NavigationProps>();

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
              devices.map((device: Device) => (
                <DeviceButton
                  device={device}
                  onPress={() =>
                    navigation.navigate('EditDevice', {device: device})
                  }
                />
              ))
            ) : (
              <Text style={styles.scrollInfoText}>No devices</Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <IconButton
            style={styles.buttonStyle}
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
  scrollInfoText: {
    padding: 100,
    textAlign: 'center',
    fontSize: 30,
    color: 'lightgray',
  },
  buttonStyle: {
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
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 15,
    zIndex: 1,
  },
});

export default HomeScreen;
