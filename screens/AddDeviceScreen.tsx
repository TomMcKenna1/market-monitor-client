import { ActivityIndicator, SafeAreaView, View } from "react-native";

const AddDeviceScreen = props => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size="large" color="#0FA3B1"/>
            </View>
        </SafeAreaView>
    )
};

export default AddDeviceScreen