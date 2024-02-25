import { SafeAreaView, Text, View } from "react-native";

const InitDeviceScreen = props => {
  const {navigation, route, addDevice} = props;
  const {peripheral} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            padding: 15,
            zIndex: 1,
          }}>
          <Text>Test Init : {peripheral.id}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InitDeviceScreen