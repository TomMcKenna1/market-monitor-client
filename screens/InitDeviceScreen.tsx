import {useRoute} from '@react-navigation/native';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import RoundTextInput from '../components/RoundTextInput';

interface InitDeviceScreenProps {
  addDevice: CallableFunction;
}
const InitDeviceScreen = (props: InitDeviceScreenProps) => {
  const {addDevice} = props;
  const route = useRoute();
  const {peripheral} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 70, alignItems: 'center'}}>
        <Text>Test Init : {peripheral.id}</Text>
        <RoundTextInput placeholder="Home" />
        <RoundTextInput placeholder="Room" />
      </View>
    </SafeAreaView>
  );
};

export default InitDeviceScreen;
