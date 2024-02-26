import {TextInput, View, ViewProps} from 'react-native';

interface RoundTextInputProps extends ViewProps {
  placeholder: string | undefined;
}

const RoundTextInput = (props: RoundTextInputProps) => {
  const {placeholder = "", ...other} = props;

  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      {...other}>
      <TextInput
        style={{padding: 20, fontSize: 30}}
        placeholder={placeholder}
      />
    </View>
  );
};

export default RoundTextInput;
