import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface DeviceButtonProps extends TouchableOpacityProps {
  title: string;
  deviceName: string;
}

const DeviceButton = (props: DeviceButtonProps) => {
  const {title, deviceName, ...other} = props;
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
            {title}
          </Text>
          <Text
            style={{paddingLeft: 10, paddingRight: 10, fontWeight: '400', fontSize: 15, color: 'lightgray'}}>
            {deviceName}
          </Text>
        </View>
        <View style={{backgroundColor: "green", width: 10, height: 10, margin: 20, borderRadius: 20}}/>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceButton;
