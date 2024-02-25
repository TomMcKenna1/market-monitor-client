import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Device from '../device.js'

interface DeviceButtonProps extends TouchableOpacityProps {
  device: Device;
}

const DeviceButton = (props: DeviceButtonProps) => {
  const {device, ...other} = props;
  return (
    <TouchableOpacity activeOpacity={0.75} style={{padding: 15}} {...other}>
      <View
        style={{
          flexDirection: "row",
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
        }}>
        <View style={{flex: 1}}>
          <Text style={{padding: 10, fontWeight: '400', fontSize: 25}}>
            {device.home} - {device.room}
          </Text>
          <Text
            style={{paddingLeft: 10, paddingRight: 10, fontWeight: '400', fontSize: 15, color: 'lightgray'}}>
            {device.type}
          </Text>
        </View>
        <View style={{backgroundColor: device.connected ? "green" : "red", width: 10, height: 10, margin: 20, borderRadius: 20}}/>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceButton;
