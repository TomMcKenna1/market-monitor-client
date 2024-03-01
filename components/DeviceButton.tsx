import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import Device from '../device.js';

interface DeviceButtonProps extends TouchableOpacityProps {
  device: Device;
}

const DeviceButton = (props: DeviceButtonProps) => {
  const {device, ...other} = props;
  return (
    <TouchableOpacity activeOpacity={0.75} style={{padding: 15}} {...other}>
      <View style={styles.deviceButtonContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.deviceButtonTitle}>{device.name}</Text>
          <Text style={styles.deviceButtonText}>{device.type}</Text>
        </View>
        <View
          style={[
            styles.deviceButtonConnectedIndicator,
            {backgroundColor: device.connected ? 'green' : 'red'},
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deviceButtonTitle: {
    padding: 10,
    fontWeight: '400',
    fontSize: 25,
  },
  deviceButtonContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f0f0',
    height: 80,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  deviceButtonText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '400',
    fontSize: 15,
    color: 'lightgray',
  },
  deviceButtonConnectedIndicator: {
    width: 10,
    height: 10,
    margin: 20,
    borderRadius: 20,
  },
});

export default DeviceButton;
