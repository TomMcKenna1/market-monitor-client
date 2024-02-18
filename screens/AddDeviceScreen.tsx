import {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const AddDeviceScreen = props => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{justifyContent: 'center', flex: 1}}>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={{textAlign: 'center', fontSize: 30}}>
            Location access
          </Text>
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
          <TouchableOpacity activeOpacity={0.75} style={{padding: 15}}>
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
              <Text style={{padding: 20, textAlign: 'center', fontSize: 17, color: "white"}}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{display: 'none', justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            position: 'absolute',
            top: 150,
            width: '100%',
            textAlign: 'center',
            fontSize: 30,
          }}>
          Looking for devices
        </Text>
        <ActivityIndicator size="large" color="#0FA3B1" style={{padding: 10}} />
      </View>
    </SafeAreaView>
  );
};

export default AddDeviceScreen;
