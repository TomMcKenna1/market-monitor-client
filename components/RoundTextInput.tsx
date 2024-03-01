import {StyleSheet, TextInput, View, ViewProps} from 'react-native';

interface RoundTextInputProps extends ViewProps {
  placeholder: string | undefined;
}

const RoundTextInput = (props: RoundTextInputProps) => {
  const {placeholder = '', ...other} = props;

  return (
    <View style={styles.roundTextInputContainer} {...other}>
      <TextInput style={styles.roundTextInputText} placeholder={placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  roundTextInputContainer: {
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
  },
  roundTextInputText: {
    padding: 20,
    fontSize: 30,
  },
});

export default RoundTextInput;
