import {useRoute, RouteProp} from '@react-navigation/native';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {StackParamList} from '../App';
import {Buffer} from 'buffer';

import BleManager from 'react-native-ble-manager';
import TextButton from '../components/TextButton';
import {useState} from 'react';

const EditDeviceScreen = () => {
  const route = useRoute<RouteProp<StackParamList, 'EditDevice'>>();
  const {device} = route.params;
  const [loading, setLoading] = useState(false);

  async function connectToDevice(data: any) {
    setLoading(true);
    await BleManager.connect(device.uuid);
    try {
      await BleManager.retrieveServices(device.uuid);
      await BleManager.write(
        device.uuid,
        'A07498CA-AD5B-474E-940D-16F1FBE7E8CD',
        '664161df-1bae-4003-968f-5b5a6713cde4',
        data,
        800,
      );
      console.log('disconnecting...');
    } finally {
      await BleManager.disconnect(device.uuid);
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="white" style={{padding: 10}} />
        </View>
      ) : (
        <></>
      )}
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255,0,0,0.7)',
            }}></View>
          <TextButton
            text="BTC"
            onPress={() =>
              connectToDevice(
                Buffer.from(
                  '{"assets": [{"ticker": "BTC-USD", "name": "BTC"}]}',
                ).toJSON().data,
              )
            }
          />
          <TextButton
            text="S&P 500"
            onPress={() =>
              connectToDevice(
                Buffer.from(
                  '{"assets": [{"ticker": "^GSPC", "name": "S&P 500"}]}',
                ).toJSON().data,
              )
            }
          />
          <TextButton
            text="Selection of stocks"
            onPress={() =>
              connectToDevice(
                Buffer.from(
                  '{"assets": [{"ticker": "GOOG"}, {"ticker": "AI"}, {"ticker": "META"}, {"ticker": "MNDY"}]}',
                ).toJSON().data,
              )
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default EditDeviceScreen;
